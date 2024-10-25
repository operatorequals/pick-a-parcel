export const matchIDPrefix = '';
// export const matchIDPrefix = 'pick-a-parcel-';

export const maxMatchID = 10000;
export const generateMatchID = () => matchIDPrefix+(Math.round(Math.random() * maxMatchID)).toString();

export const testingMultiplayer = true