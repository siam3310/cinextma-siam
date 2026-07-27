"use client";

import { BsBookmarkFill } from "react-icons/bs";
import { addToast } from "@heroui/react";
import IconButton from "./IconButton";

interface BookmarkButtonProps {
  data: any;
  isTooltipDisabled?: boolean;
}

const BookmarkButton: React.FC<BookmarkButtonProps> = ({ isTooltipDisabled }) => {
  const handleBookmark = () => {
    addToast({
      title: "Bookmarks feature coming soon",
      description: "Create an account to save your favorite movies and shows",
      color: "info",
    });
  };

  return (
    <IconButton
      onPress={handleBookmark}
      icon={<BsBookmarkFill size={20} />}
      variant="faded"
      color="warning"
      tooltip={isTooltipDisabled ? undefined : "Bookmark (Coming Soon)"}
    />
  );
};

export default BookmarkButton;
