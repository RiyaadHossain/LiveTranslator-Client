import { EMERGENCY_LEVEL, SESSION_TYPE, STATUS } from "../enums/session";

export const getStatusColor = (status) => {
  switch (status) {
    case STATUS.COMPLETED:
      return "#4CAF50";
    case STATUS.INTERRUPTED:
      return "#FF9800";
    case STATUS.FAILED:
      return "#f44336";
    default:
      return "#9E9E9E";
  }
};

export const getEmergencyColor = (level) => {
  switch (level) {
    case EMERGENCY_LEVEL.HIGH:
      return "#f44336";
    case EMERGENCY_LEVEL.MEDIUM:
      return "#FF9800";
    case EMERGENCY_LEVEL.LOW:
      return "#4CAF50";
    default:
      return "#9E9E9E";
  }
};

export const getSessionTypeIcon = (type) => {
  switch (type) {
    case SESSION_TYPE.EMERGENCY:
      return "flash";
    case SESSION_TYPE.CONSULTATION:
      return "medical";
    case SESSION_TYPE.ROUTINE:
      return "checkmark-circle";
    case SESSION_TYPE.FOLLOW_UP:
      return "repeat";
    default:
      return "document";
  }
};
