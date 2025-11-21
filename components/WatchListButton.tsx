"use client";
import React, { useMemo, useState } from "react";
// Optional: Import Server Action here later
//  import { toggleWatchlistStock } from "@/lib/actions/watchlist.actions";

interface WatchlistButtonProps {
  symbol: string;
  company?: string;
  isInWatchlist: boolean;
  showTrashIcon?: boolean;
  type?: "button" | "icon";
  onWatchlistChange?: (symbol: string, isAdded: boolean) => void;
}

const WatchlistButton = ({
  symbol,
  company,
  isInWatchlist,
  showTrashIcon = false,
  type = "button",
  onWatchlistChange,
}: WatchlistButtonProps) => {
  const [added, setAdded] = useState<boolean>(!!isInWatchlist);

  const label = useMemo(() => {
    if (type === "icon") return added ? "" : "";
    return added ? "Remove from Watchlist" : "Add to Watchlist";
  }, [added, type]);

  const handleClick = async (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent navigation if inside a Link

    const next = !added;
    setAdded(next); // Optimistic UI update

    // Call the parent function if provided
    if (onWatchlistChange) {
      onWatchlistChange(symbol, next);
    }

    // TODO: Later, you will add your Server Action here
    // await toggleWatchlistStock(symbol, next);
  };

  // 1. ICON VARIANT (The Star)
  if (type === "icon") {
    return (
      <button
        type="button"
        title={
          added
            ? `Remove ${symbol} from watchlist`
            : `Add ${symbol} to watchlist`
        }
        className={`p-2 rounded-full transition-all duration-200 ${
          added
            ? "text-yellow-500 hover:bg-yellow-500/10"
            : "text-gray-400 hover:text-yellow-500 hover:bg-gray-800"
        }`}
        onClick={handleClick}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill={added ? "currentColor" : "none"}
          stroke="currentColor"
          strokeWidth="1.5"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.385a.563.563 0 00-.182-.557L3.04 10.385a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345l2.125-5.111z"
          />
        </svg>
      </button>
    );
  }

  // 2. BUTTON VARIANT (The Big Button)
  return (
    <button
      type="button"
      onClick={handleClick}
      className={`flex items-center justify-center px-4 py-2 rounded-lg text-sm font-medium transition-colors w-full sm:w-auto ${
        added
          ? "bg-red-500/10 text-red-500 hover:bg-red-500/20 border border-red-500/20"
          : "bg-yellow-500 text-gray-900 hover:bg-yellow-400"
      }`}
    >
      {showTrashIcon && added ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-4 h-4 mr-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
          />
        </svg>
      ) : null}
      <span>{label}</span>
    </button>
  );
};

export default WatchlistButton;
