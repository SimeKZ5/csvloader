import FingerprintJS from "@fingerprintjs/fingerprintjs";

export const getUniqueDeviceId = async () => {
  let deviceId = localStorage.getItem("deviceId");
  if (!deviceId) {
    const fp = await FingerprintJS.load();
    const result = await fp.get();

    deviceId = result.visitorId;

    localStorage.setItem("deviceId", deviceId);
  }

  return deviceId;
};
