const twelveMonthsAgo = new Date(Date.now() - 365 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
const today = new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

export {twelveMonthsAgo, thirtyDaysAgo, today};