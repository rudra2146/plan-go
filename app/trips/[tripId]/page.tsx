import { auth } from "@/auth";
import TripDetailClient from "@/Components/trip-detail";
import { prisma } from "@/lib/prisma";


export default async function TripDetail({
    params,
    }:{
        params: Promise<{tripId: string}>;
    }) {

        const {tripId} = await params
        const session = await auth()
        if(!session){
            return <div>Please sign in</div>
        }
        const trip = await prisma.trip.findFirst({
            where: {id: tripId, userId: session.user?.id}
        })

        if(!trip){
            return <div>Trip not found</div>
        }

        return <TripDetailClient trip={trip} />
    }