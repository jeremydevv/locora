const RecentlyViewed : Array<string> = []

export function PushRecentlyViewed(business_id : string) {
    if (!business_id) {
        return
    }

    const existingIndex = RecentlyViewed.indexOf(business_id)

    if (existingIndex !== -1) {
        RecentlyViewed.splice(existingIndex, 1)
    }

    RecentlyViewed.unshift(business_id)

    if (RecentlyViewed.length > 10) {
        RecentlyViewed.length = 10
    }

}

export function GetRecentlyViewedItems() : Array<string> {
    return RecentlyViewed
}
