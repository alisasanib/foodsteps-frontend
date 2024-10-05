import React, { memo } from "react";
import { Input } from "antd";
import { ReactComponent as SearchIcon } from "assets/icons/SearchIcon.svg";
import { ReactComponent as CloseIcon } from "assets/icons/CloseIcon.svg";
import "./CustomInput.css";

type SearchProps = {
  onChange: (value: string) => void;
  value: string;
};

const SearchInput: React.FC<SearchProps> = memo(({ value, onChange }) => {
  const handleClear = (e: React.MouseEvent<SVGElement, MouseEvent>) => {
    e.stopPropagation();
    onChange("");
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.code === "Enter") {
      onChange("");
    }
  };

  return (
    <Input
      className={`input ${value ? "input-focused" : ""}`}
      size='large'
      placeholder='Search posts'
      value={value}
      onChange={(e) => onChange(e.target.value)}
      prefix={<SearchIcon className={`search-icon ${value ? "search-icon-focused" : ""}`} />}
      suffix={
        value ? (
          <CloseIcon
            onClick={handleClear}
            onKeyDown={handleKeyDown}
            data-testid='close-icon'
            className='close-icon'
            tabIndex={0}
            aria-label='Clear search input'
          />
        ) : null
      }
      aria-label='Search posts'
    />
  );
});

export default SearchInput;
