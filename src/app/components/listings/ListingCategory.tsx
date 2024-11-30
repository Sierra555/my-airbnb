'use client';

import { IconType } from "react-icons";

type ListingCategoryPorps = {
    icon: IconType,
    label: string,
    description: string
}

const ListingCategory = ({ icon: Icon, label, description }: ListingCategoryPorps) => {
  return (
    <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
            <Icon size={40} className="text-neutral-600"/>
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold">
                    {label}
                </h2>
                <p className="text-neutral-500 font-light">
                    {description}
                </p>
            </div>
        </div>
    </div>
  );
};

export default ListingCategory;