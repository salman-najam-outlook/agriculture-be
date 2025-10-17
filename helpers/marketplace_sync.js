const { publishToQueue } = require("./rabbitmq/publish");

function createPayload(userData) {
  const {
    id,
    type,
    deactivation_reason,
    deactivation_start_date,
    deactivation_end_date,
    activation_date,
    range,
    firstName,
    lastName,
    email,
    mobile,
    countryCode,
    stateId,
    countryId,
    facilityPicUrl,
    active,
  } = userData;

  const fullName = [firstName, lastName].filter(Boolean).join(" ").trim();

  switch (type) {
    case "deactivateUser":
      return {
        connected_farmer_user_id: id,
        deactivation_reason,
        is_active: false,
        deactivation_start_date: deactivation_start_date || new Date(),
        deactivation_end_date: deactivation_end_date || null,
        activation_date: activation_date || null,
        range: range || null,
      };

    case "reactivateUser":
      return {
        connected_farmer_user_id: id,
        deactivation_reason: null,
        is_active: true,
        deactivation_start_date: null,
        deactivation_end_date: null,
        activation_date: activation_date || new Date(),
        range: range || null,
      };

    default:
      return {
        connected_farmer_user_id: id,
        email: email || null,
        mobile: mobile
          ? `${countryCode || ""}${mobile}`.replace(/\+/g, "")
          : null, // Combine country code and mobile, remove '+'
        full_name: fullName,
        city: stateId || null,
        country: countryId || null,
        profile_picture: facilityPicUrl || null,
        disabled: active === "1" || active === 1 ? 0 : 1, // Convert string or number active status to disabled flag
        type: type || null,
      };
  }
}

exports.syncMarketPlaceUserData = async (userData) => {
  const MARKETPLACE_USER_QUEUE =
    process.env.MARKETPLACE_USER_QUEUE || "marketplace-user-queue";

  try {
    const payload = createPayload(userData);

    if (!payload.connected_farmer_user_id) {
      throw new Error("connected_farmer_user_id is required");
    }

    await publishToQueue(
      MARKETPLACE_USER_QUEUE,
      "dds-exchange",
      "marketplace-user",
      payload
    );

    console.log("Successfully synced marketplace user to DDS");
    return true;
  } catch (err) {
    console.error("Error syncing marketplace user to DDS:", err.message);
    return false; // Ensure the function always returns a boolean
  }
};