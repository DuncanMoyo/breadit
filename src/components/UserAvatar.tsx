import { User } from "@prisma/client";
import { Avatar, AvatarFallback } from "./ui/Avatar";
import Image from "next/image";
import Icons from "./ui/Icons";
import { AvatarProps } from "@radix-ui/react-avatar";

interface UserAvatarProps extends AvatarProps {
  user: Pick<User, "name" | "image">;
}

const UserAvatar = ({ user, ...props }: UserAvatarProps) => {
  return (
    <Avatar {...props}>
      {user.image ? (
        <div className="relative aspect-square h-full w-full">
          <Image
            fill
            src={user.image}
            alt="profile-picture"
            referrerPolicy="no-referrer"
          />
        </div>
      ) : (
        <AvatarFallback>
          <span className="sr-only">{user?.name}</span>
          <Icons.user className="h4 w4" />
        </AvatarFallback>
      )}
    </Avatar>
  );
};

export default UserAvatar;
