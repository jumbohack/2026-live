import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const get = query({
    args: {},
    handler: async (ctx, _) => {
        return await ctx.db.query("sunday").collect();
    }
});

// export const addData = mutation({
//     args: { },
//     handler: async (ctx, args) => {
//         await ctx.db.insert("saturday", {
//             title: "Check In",
//             startTime: Date.now(),
//             endTime: Date.now(),
//             type: "normal"
//         });
//     }
// });
