import prisma from '../lib/prismadb';

export interface IListingParams {
	userId?: string;
}

export default async function getListings(params: IListingParams) {
	try {
		const { userId } = params;

		let query: any = {};

		if (userId) {
			query.userId = userId;
		}

		const listings = await prisma.listing.findMany({
			where: query,
			orderBy: {
				createdAt: 'desc',
			},
		});

		const safeListings = listings.map(listing => ({
			...listing,
			createdAt: listing.createdAt.toISOString(),
		}));

		return safeListings;
	} catch (error: any) {
		console.log(error);
		throw new Error('Could not get listings');
	}
}
