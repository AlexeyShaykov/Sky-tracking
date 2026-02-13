import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
  ComboboxValue,
} from '@/components/ui/combobox';

const FilterWithSearch = ({
  data,
  selectedValue,
  onValueChange,
  entityName = 'Select',
}: {
  data: string[]
  selectedValue: string | null
  onValueChange: (value: string | null) => void
  entityName?: string
}) => {
  return (
    <Combobox
        items={data}
        defaultValue={entityName}
        onValueChange={(value: string | null) => {
          if (selectedValue === value) {
            onValueChange(null);
            return;
          }
          onValueChange(value === null ? null : value);
        }}
        isItemEqualToValue={(item) => item === selectedValue}
      >
        <ComboboxTrigger
          render={
            <Button
              variant="outline"
              className="w-[180px] justify-between font-normal"
            >
              <ComboboxValue>{selectedValue || `Select ${entityName}`}</ComboboxValue>
              <ChevronDownIcon
                data-slot="combobox-trigger-icon"
                className="text-muted-foreground pointer-events-none size-4"
              />
            </Button>
          }
          className="w-[180px]"
        />
        <ComboboxContent
          className="w-[180px]"
        >
          <ComboboxInput
            showTrigger={false}
            placeholder={`Search ${entityName}`}
            showClear
          />
          <ComboboxEmpty>{`No ${entityName} found.`}</ComboboxEmpty>
          <ComboboxList>
            {(country) => (
              <ComboboxItem
                key={country}
                value={country}
              >
                {country}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
  );
};

export default FilterWithSearch;