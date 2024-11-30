'use client';
import { Range } from 'react-date-range';
import Calendar from '../inputs/Calendar';
import Button from '../Button';

type ListingReservationProps ={
    price: number,
    totalPrice: number,
    dateRange: Range,
    onSubmit: () => void,
    onChangeDate: (value: Range) => void,
    disabled?: boolean,
    disabledDates: Date[]
}
const ListingReservation = ({ 
    price, 
    totalPrice, 
    dateRange, 
    onChangeDate, 
    onSubmit, 
    disabledDates, 
    disabled }: ListingReservationProps) => {
  return (
    <div className='
            bg-white
            rounded-xl
            border-[1px]
            border-neutral-200
            overflow-hidden
        ' 
    >
        <div className="flex items-center gap-2 p-4">
            <p className='text-2xl font-semibold'>$ {price}</p>
            <span className='font-lignt text-neutral-600'>per night</span>
        </div> 
        <hr />
        <Calendar
            value={dateRange}
            disabledDates={disabledDates}
            onChange={(value) => onChangeDate(value)}
        />
        <hr />
        <div className="p-4">
            <Button 
                label="Reserve"
                disabled={disabled}
                handleClick={onSubmit}
            />
        </div>
        <div className="p-4 flex items-center justify-between font-semibold text-lg">
            <p>Total</p>
            <p>$ {totalPrice}</p>
        </div>
    </div>
  );
};

export default ListingReservation;