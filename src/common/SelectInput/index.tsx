import React, { memo } from "react";
import { Select, Space } from "antd";
import { SelectOption } from "types/SelectOption.dto";

interface SelectInputProps {
  options: SelectOption[];
  value: string | undefined;
  onChange: (val: string) => void;
}

const SelectInput: React.FC<SelectInputProps> = memo(({ options, value, onChange }) => (
  <Space wrap>
    <Select
      value={value}
      onChange={onChange}
      options={options}
    />
  </Space>
));

export default SelectInput;
