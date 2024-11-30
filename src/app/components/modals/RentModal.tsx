'use client';

import React, { useMemo, useRef, useState } from 'react';
import Modal from './Modal';
import useRentModal from '@/app/hooks/useRentModal';
import Heading from '../Heading';
import { categories } from '@/app/constants';
import CategoryInput from '../inputs/CategoryInput';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import CountrySelect from '../inputs/CountrySelect';
import Map from '@/app/components/map/Map';
import Counter from '../inputs/Counter';
import ImageUpload from '../inputs/ImageUpload';
import Input from '../inputs/Input';
import axios from 'axios';
import { useRouter } from 'next/navigation';

enum STEPS {
    CATEGORY,
    LOCATION,
    INFO,
    IMAGES,
    DESCRIPTION,
    PRICE
}

const RentModal = () => {
    const rentModal = useRentModal();
    const [step, setStep] = useState(STEPS.CATEGORY);
    const [isLoading, setIsLoading] = useState(false);
    const clearSelectBtn = useRef(null);
    const router = useRouter();

    const {
        register,
        handleSubmit, 
        setValue, 
        watch, 
        formState: {
        errors,
        }, reset 
    } = useForm<FieldValues>({
        defaultValues: {
            category: 'Other',
            location: null,
            guestCount: 1,
            roomCount: 1,
            bathroomCount: 1,
            imageSrc: '',
            price: 1,
            title: '',
            description: '',
        }
    });

    const category = watch('category');
    const location = watch('location');
    const guestCount = watch('guestCount');
    const roomCount = watch('roomCount');
    const bathroomCount = watch('bathroomCount');
    const imageSrc = watch('imageSrc');

    const setCustomValue = (id: string, value: any) => {
        setValue(id, value, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }

    const onBack = () => {
        setStep((prev) => prev - 1);
    };

    const onNext = () => {
        setStep((prev) => prev + 1);
    };

    const actionLabel = useMemo(() => {
        if (step === STEPS.PRICE) {
            return 'Create';
        }

        return 'Next';
    }, [step]);

    const secondaryActionLabel = useMemo(() => {
        if (step === STEPS.CATEGORY) {
            return undefined;
        }

        return 'Back';
    }, [step]);

    const onSubmit : SubmitHandler<FieldValues> = async (data) => {
        if (step !== STEPS.PRICE) {
            return onNext();
        }

        setIsLoading(true);

        try {
            await axios.post('/api/listings', data);

            toast.success('Submit successfully');
            reset();
            router.refresh();
            setStep(STEPS.CATEGORY);
            rentModal.onClose();
        } catch (error: any) {
            toast.error(`Something went wrong : ${error}`);
        } finally {
            setIsLoading(false);
        }
    }

    const bodyContent = () => {
        switch (step) {
            case (STEPS.CATEGORY): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='Which of these best deascribes your place?'
                            subtitle='Pick a category'
                        />
                        <div className="
                            grid 
                            grid-cols-1 
                            md:grid-cols-2
                            gap-3
                            max-h-[50vh]
                            overflow-y-auto"
                        >
                            {categories.map(({label, icon, description}) => (
                                <div key={label} className='col-span-1'>
                                    <CategoryInput
                                        onClick={(category) => 
                                            setCustomValue('category', category)}
                                        selected={category === label}
                                        label={label}
                                        icon={icon}
                                        description={description}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                )
            }

            case (STEPS.LOCATION): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='Where is your place located?'
                            subtitle='Help guests find you'
                        />
                        <CountrySelect 
                            id='location'
                            value = {location}
                            onChange={(value) => setCustomValue('location', value)}
                            register={register}
                            errors={errors}
                            required
                            ref={clearSelectBtn}
                        />
                         <Map 
                            center={location?.latlng}
                         />
                    </div>
                )
            }
            
            case (STEPS.INFO): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='Share some basics about your place?'
                            subtitle='What amenities do you have?'
                        />
                        <Counter 
                            title="Guests"
                            subtitle="How many guests do you allow?"
                            value={guestCount}
                            onChange={(value) => setCustomValue('guestCount', value)}
                        />
                        <hr />
                        <Counter 
                            title="Rooms"
                            subtitle="How many rooms do you allow?"
                            value={roomCount}
                            onChange={(value) => setCustomValue('roomCount', value)}
                        />
                        <hr />
                        <Counter 
                            title="Bathrooms"
                            subtitle="How many bathrooms do you allow?"
                            value={bathroomCount}
                            onChange={(value) => setCustomValue('bathroomCount', value)}
                        />
                    </div>
                )
            }
            case (STEPS.IMAGES): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='Add a photo of your place?'
                            subtitle='Show what your place looks like!'
                        />
                        <ImageUpload 
                            id='imageSrc'
                            value={imageSrc}
                            onChange={(value) => setCustomValue('imageSrc', value)}
                            register={register}
                            errors={errors}
                            required
                        />
                    </div>
                )
            }
            case (STEPS.DESCRIPTION): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='How would you describe your place?'
                            subtitle='Short and sweet works the best'
                        />
                        <Input 
                            id="title" 
                            label="Title"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
                        />
                        <hr /> 
                        <Input 
                            id="description" 
                            label="Description"
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
                        />
                    </div>
                )
            }
        
            case (STEPS.PRICE): {
                return  (
                    <div className="flex flex-col gap-8">
                        <Heading 
                            title='Now, set your price.'
                            subtitle='How much do you charge per night?'
                        />
                        <Input 
                            id='price'
                            label="Price"
                            formatPrice
                            type='number'
                            register={register}
                            errors={errors}
                            disabled={isLoading}
                            required
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
        title='Airbnb your home'
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={step === STEPS.CATEGORY ? undefined : onBack}
        isOpen={rentModal.isOpen}
        onOpen={rentModal.onOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        body={bodyContent}
        disabled={isLoading}
        additionalRefs={[clearSelectBtn]}
    />
  );
};

export default RentModal;