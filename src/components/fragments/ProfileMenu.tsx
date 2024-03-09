import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/context/UserContext";

const ProfileMenu = () => {
  const { user } = useUser();
  const username = user ? user.username : "";
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <img src="./avatar.png" className="m-2 h-10" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 mr-10">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="font-normal">
          {user ? `user: ${username}` : null}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-red-700">Log out</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default ProfileMenu;
