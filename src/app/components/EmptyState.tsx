'use client';

import Heading from "./Heading";
import Button from "./Button";
import Link from "next/link";

type EmptyStateProps = {
title?: string,
subtitle?: string,
showReset?: boolean
}

const EmptyState = ({
    title='No exact matches',
    subtitle="Try chnaging or removind some of your filters",
    showReset
}:EmptyStateProps) => {
  return (
    <div
        className="
        h-[60vh]
        flex
        flex-col
        gap-2
        justify-center
        items-center
        "
    >
        <Heading
            center
            title={title}
            subtitle={subtitle}
         />
         <div className="
            w-48
            mt-4
         ">
            {showReset && (
                <Link href="/">
                    <Button 
                        outline
                        label='Remove all filters'
                    />
                </Link>
            )}
         </div>
    </div>
  );
};

export default EmptyState;