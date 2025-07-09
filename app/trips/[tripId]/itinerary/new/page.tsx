import NewLocationClient from "@/Components/new-location";

export default async function NewLocaion({
    params}: {params: Promise<{tripId: string}>
}) {
    const {tripId} = await params;

    return <NewLocationClient tripId={tripId}/>
}