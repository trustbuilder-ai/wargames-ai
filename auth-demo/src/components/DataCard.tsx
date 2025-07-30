import React from "react";
import "./DataCard.css";

interface DataCardProps<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
  title?: string;
  children: (data: T) => React.ReactNode;
  className?: string;
}

/**
 * Generic component for displaying API data with loading, error, and empty states.
 * Works with any data type and handles all common display states.
 */
export function DataCard<T>({
  data,
  loading,
  error,
  title,
  children,
  className = "",
}: DataCardProps<T>) {
  if (loading) {
    return (
      <div className={`data-card loading ${className}`}>
        <div className="loading-spinner"></div>
        <p>Loading{title ? ` ${title}` : ""}...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={`data-card error ${className}`}>
        <p>
          Error loading {title || "data"}: {error.message}
        </p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={`data-card empty ${className}`}>
        <p>No {title || "data"} available</p>
      </div>
    );
  }

  return <div className={`data-card ${className}`}>{children(data)}</div>;
}

export default DataCard;
