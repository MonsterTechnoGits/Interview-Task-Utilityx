import { useAppContext } from "../context/AppContext";
import type { User } from "../types";

export const UserAvatar: React.FC<{ userId?: User; size?: "sm" | "md" }> = ({
  userId,
  size = "sm",
}) => {
  const { user } = useAppContext();
  const sizeClass = size === "sm" ? "w-6 h-6 text-xs" : "w-8 h-8 text-sm";

  const renderUser  = userId || user;

  return (
    <div
      className={`${sizeClass} bg-blue-500 rounded-full flex items-center justify-center text-white font-medium`}
    >
      {renderUser?.name.charAt(0) || "?"}
    </div>
  );
};
