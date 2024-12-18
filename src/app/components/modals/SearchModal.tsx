'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import Modal from './Modal';
import useSearchModal from '@/app/hooks/useSearchModal';
import { useCallback, useMemo, useRef, useState } from 'react';
import { Range } from 'react-date-range';
import Map from '../map/Map';
import CountrySelect, { CountrySelectValue } from '../inputs/CountrySelect';
import qs from 'query-string';
import { formatISO } from 'date-fns';
import Heading from '../Heading';
import Calendar from '../inputs/Calendar';
import Counter from '../inputs/Counter';

enum STEPS {
    LOCATION,
    DATE,
    INFO
}

const SearchModal = () => {
    const router = useRouter();
    const params = useSearchParams();
    const searchModal = useSearchModal();
    const clearSelectBtn = useRef(null);

    const [location, setLocation] = useState<CountrySelectValue>();
    const [step, setStep] = useState(STEPS.LOCATION);
    const [guestCount, setGuestCount] = useState(1);
    const [roomCount, setRoomCount] = useState(1);
    const [bathroomCount, setBathroomCount] = useState(1);
    const [dateRange, setDateRange] = useState<Range>({
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
    });

    const onBack = useCallback(() => {
        setStep((prev) => prev - 1);
    }, []);

    const onNext = useCallback(() => {
        setStep((prev) => prev + 1);
    }, []);

    const onSubmit = useCallback(async() => {
        if (step !== STEPS.INFO) {
            return onNext();
        }

        let currentQuery = {};

        if (params) {
            currentQuery = qs.parse(params.toString());
        }

        const updatedQuery: any = {
            ...currentQuery,
            locationValue: location?.value,
            guestCount,
            roomCount,
            bathroomCount
        }

        if (dateRange.startDate) {
            updatedQuery.startDate = formatISO(dateRange.startDate);
        }

        if (dateRange.endDate) {
            updatedQuery.endDate = formatISO(dateRange.endDate);
        }

        const url = qs.stringifyUrl({
            url: '/',
            query: updatedQuery
        }, { skipNull: true});

        setStep(STEPS.LOCATION);
        searchModal.onClose();

        router.push(url);
    }, [step, searchModal, location, router, roomCount, bathroomCount, guestCount, dateRange, onNext, params]);

    const actionLabel = useMemo(() => {
        if (step === STEPS.INFO) {
            return 'Search';
        }

        return 'Next';
    }, [step]);

    const bodyContent = () => {
        switch (step) {
            case (STEPS.LOCATION): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='Where do you want to go?'
                            subtitle='Find the perfect location!'
                        />
                            <CountrySelect 
                                id='location'
                                value = {location}
                                onChange={(value) => setLocation(value as CountrySelectValue)}
                                ref={clearSelectBtn}
                        />
                         <Map 
                            center={location?.latlng}
                         />
                    </div>
                )
            }

            case (STEPS.DATE): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='When do oyu plan to go?'
                            subtitle='Make sure the dates are free'
                        />
                        <Calendar 
                            value = {dateRange}
                            onChange={(value) => setDateRange(value)}
                        />
                    </div>
                )
            }
            
            case (STEPS.INFO): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='More information'
                            subtitle='Find your perfect place'
                        />
                        <Counter 
                            title="Guests"
                            subtitle="How many guests are coming?"
                            value={guestCount}
                            onChange={(value) => setGuestCount(value)}
                        />
                        <hr />
                        <Counter 
                            title="Rooms"
                            subtitle="How many rooms do you need?"
                            value={roomCount}
                            onChange={(value) => setRoomCount(value)}
                        />
                        <hr />
                        <Counter 
                            title="Bathrooms"
                            subtitle="How many bathrooms do you need?"
                            value={bathroomCount}
                            onChange={(value) => setBathroomCount(value)}
                        />
                    </div>
                )
            }

            default:
                return null;
        }
    } 

return (
    <Modal 
        isOpen={searchModal.isOpen}
        title='Filters'
        onClose={searchModal.onClose}
        onOpen={searchModal.onOpen}
        onSubmit={onSubmit}
        actionLabel={actionLabel}
        secondaryActionLabel="Back"
        secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
        body={bodyContent}
    />
    );
};

export default SearchModal;