import React from 'react';
import Select from 'react-select';
import useCountries from '@/app/hooks/useCountries';
import { FieldErrors, FieldValues, UseFormRegister } from 'react-hook-form';

export type CountrySelectValue = {
  flag: string;
  label: string;
  latlng: number[];
  region: string;
  value: string;
};

type CountrySelectProps = {
  id: string,
  value?: CountrySelectValue,
  onChange: (value: CountrySelectValue) => void,
  register?: UseFormRegister<FieldValues>;
  errors?: FieldErrors<FieldValues>;
  required?: boolean;
  ref?: React.Ref<HTMLDivElement>;
};

const CountrySelect = (({ id, value, onChange, register, errors, required, ref }: CountrySelectProps) => {
    const { getAll } = useCountries();

    return (
      <div ref={ref}>
        <Select
          placeholder="Anywhere"
          isClearable
          {...(register ? register(id, { required }) : {})}
          options={getAll()}
          value={value}
          onChange={(value) => onChange(value as CountrySelectValue)}
          formatOptionLabel={(option) => (
            <div className="flex items-center gap-3 cursor-pointer">
              <div>{option.flag}</div>
              <p>
                {option.label},
                <span className="text-neutral-500 ml-1">{option.region}</span>
              </p>
            </div>
          )}
          classNames={{
            control: () =>`
                        p-3 
                        border-2 
                        ${errors?.[id] ? 'border-rose-500' : 'border-neutral-300'}
                        ${errors?.[id] ? 'focus:border-rose-500' : 'focus:border-black'}`,
            input: () => 'text-lg cursor-pointer',
            option: () => 'text-lg',
          }}
          styles={{
            control: (baseStyles, isSelected) => ({
              ...baseStyles,
              boxShadow: 'none',
              borderColor: !isSelected ? 'none' : 'border-black',
            }),
          }}
          theme={(theme) => ({
            ...theme,
            borderRadius: 6,
            colors: {
              ...theme.colors,
              primary: 'black',
              primary25: '#ffe4e6',
            },
          })}
        />
      </div>
    );
  }
);

export default CountrySelect;