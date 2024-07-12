import Cache from 'src/model/cache.model';

export const set = async (key: string, value: string, expiration?: number) => {
    let expireAt = null;
    if (expiration) {
        let now = new Date();
        expireAt = new Date(now.setSeconds(now.getSeconds() + expiration));
    }

    return await Cache.upsert({ key, value, expireAt });
};

export const get = async (key: string) => {
    const result = await Cache.findByPk(key);
    if (!result) return null;
    return result.value;
};
