'use client';

import { useRouter } from "next/navigation";
import { Container, Heading } from "../components";
import { SafeListing, SafeUser } from "../types";
import { useCallback, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/listings/ListingCard";

type PropertiesClientProps = {
    listings?: SafeListing[] | null,
    currentUser?: SafeUser | null,
}

const PropertiesClient = ({ listings, currentUser }: PropertiesClientProps) => {
    const router = useRouter();
    const [deleteId, setDeleteId] = useState('');

    const onCancel = useCallback(async (id: string) => {
        setDeleteId(id);

        try {
            await axios.delete(`/api/listings/${id}`)
            toast.success("Property was deleted");
            router.refresh();
        } catch (error: any) {
            toast.error(`Something went worng: ${error}`)
        } finally {
            setDeleteId('');
        }
    }, [router]);

  return (
    <Container>
      <Heading 
        title="Properties"
        subtitle="List of your properties"
      />
      <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
      ">
        {listings?.map((listing) => (
            <ListingCard 
                key={listing.id}
                data={listing} 
                actionId={listing.id}
                actionlabel="Delete propery"
                onAction={onCancel}
                disabled={deleteId === listing.id}
                currentUser={currentUser}
            />
        ))}
      </div>
    </Container>
  );
};

export default PropertiesClient;