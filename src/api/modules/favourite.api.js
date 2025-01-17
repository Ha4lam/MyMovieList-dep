import privateClient from "../client/private.client.js";

const favouriteEndpoints = {
    list: "user/favourites",
    add: "user/favourites",
    remove: ({favouriteId}) => `user/favourites/${favouriteId}`
};

const favouriteApi = {
    getList: async({}) => {
        try{
            const response = await privateClient.get(favouriteEndpoints.list);
            return {response};
        }catch(error){return{error:error};}
    },
    add: async({
        mediaId,
        mediaType,
        mediaTitle,
        mediaPoster,
        mediaRate
    }) => {
        try{
            const response = await privateClient.post(favouriteEndpoints.add,
                {
                    mediaId,
                    mediaType,
                    mediaTitle,
                    mediaPoster,
                    mediaRate
            });
            return {response};
        }catch(error){return{error:error};}
    },
    remove: async({favouriteId}) => {
        try{
            const response = await privateClient.delete(favouriteEndpoints.remove({
                favouriteId
            }));
            return {response};
        }catch(error){return{error:error};}
    },

}
export default favouriteApi;