import Utils from './Utils';
import TestIDs from '../playground/src/testIDs';

const { elementByLabel, elementById } = Utils;

describe('Overlay', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    await elementById(TestIDs.NAVIGATION_TAB).tap();
    await elementById(TestIDs.OVERLAY_BTN).tap();
  });

  it('show and dismiss overlay', async () => {
    await elementById(TestIDs.SHOW_OVERLAY_BTN).tap();
    await expect(elementById(TestIDs.OVERLAY_ALERT_HEADER)).toBeVisible();
    await elementById(TestIDs.DISMISS_BTN).tap();
    await expect(elementById(TestIDs.OVERLAY_ALERT_HEADER)).toBeNotVisible();
  });

  it('overlay pass touches - true', async () => {
    await elementById(TestIDs.SHOW_TOUCH_THROUGH_OVERLAY_BTN).tap();
    await expect(elementById(TestIDs.SHOW_OVERLAY_BTN)).toBeVisible();
    await elementById(TestIDs.ALERT_BUTTON).tap();
    await expect(elementByLabel('Alert displayed')).toBeVisible();
  });

  it('overlay should redraw after orientation change', async () => {
    await elementById(TestIDs.SHOW_OVERLAY_BTN).tap();
    await device.setOrientation('landscape');
    await expect(elementById(TestIDs.OVERLAY_ALERT_HEADER)).toBeVisible();
  });

  it('setRoot should not remove overlay', async () => {
    await elementById(TestIDs.SHOW_TOUCH_THROUGH_OVERLAY_BTN).tap();
    await elementById(TestIDs.SET_ROOT_BTN).tap();
    await expect(elementById(TestIDs.OVERLAY_ALERT_HEADER)).toBeVisible();
  });

  fit('nested touchables work as expected', async () => {
    await elementById(TestIDs.TOAST_BTN).tap();
    await elementById(TestIDs.TOAST_OK_BTN_INNER).tap();
    await expect(elementByLabel('Inner button clicked')).toBeVisible();
    await elementById(TestIDs.OK_BUTTON).tap();

    await elementById(TestIDs.TOAST_BTN).tap();
    await elementById(TestIDs.TOAST_OK_BTN_OUTER).tap();
    await expect(elementByLabel('Outer button clicked')).toBeVisible();
  });

  xtest('overlay pass touches - false', async () => {
    await elementById(TestIDs.SHOW_OVERLAY_BUTTON).tap();
    await expect(elementById(TestIDs.SHOW_OVERLAY_BUTTON)).toBeVisible();
    await expect(elementById(TestIDs.TOP_BAR_ELEMENT)).toBeVisible();
    await elementById(TestIDs.HIDE_TOP_BAR_BUTTON).tap();
    await expect(elementById(TestIDs.TOP_BAR_ELEMENT)).toBeVisible();
  });
});

describe('Overlay Dismiss all', () => {
  beforeEach(async () => {
    await device.launchApp({ newInstance: true });
    await elementById(TestIDs.NAVIGATION_TAB).tap();
    await elementById(TestIDs.OVERLAY_BTN).tap();
  });

  it('dismissAllOverlays should dismiss all opened overlays', async() => {
    await elementById(TestIDs.SHOW_FULLSCREEN_OVERLAY_BTN).tap();
    await elementById(TestIDs.SHOW_OVERLAY_BTN).tap();
    await elementById(TestIDs.DISMISS_ALL_OVERLAYS_BUTTON).tap();
    await expect(elementById(TestIDs.OVERLAY_DISMISSED_COUNT)).toHaveText('2');
  });

  it('dismissAllOverlays should be able to dismiss only one overlay', async() => {
    await elementById(TestIDs.SHOW_OVERLAY_BTN).tap();
    await elementById(TestIDs.DISMISS_ALL_OVERLAYS_BUTTON).tap();
    await expect(elementById(TestIDs.OVERLAY_DISMISSED_COUNT)).toHaveText('1');
  })
})
