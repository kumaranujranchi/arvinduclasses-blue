/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type * as actions from "../actions.js";
import type * as activity from "../activity.js";
import type * as auth from "../auth.js";
import type * as banners from "../banners.js";
import type * as comments from "../comments.js";
import type * as courses from "../courses.js";
import type * as leads from "../leads.js";
import type * as notices from "../notices.js";
import type * as posts from "../posts.js";
import type * as seed from "../seed.js";
import type * as toppers from "../toppers.js";
import type * as uploads from "../uploads.js";

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";

declare const fullApi: ApiFromModules<{
  actions: typeof actions;
  activity: typeof activity;
  auth: typeof auth;
  banners: typeof banners;
  comments: typeof comments;
  courses: typeof courses;
  leads: typeof leads;
  notices: typeof notices;
  posts: typeof posts;
  seed: typeof seed;
  toppers: typeof toppers;
  uploads: typeof uploads;
}>;

/**
 * A utility for referencing Convex functions in your app's public API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = api.myModule.myFunction;
 * ```
 */
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;

/**
 * A utility for referencing Convex functions in your app's internal API.
 *
 * Usage:
 * ```js
 * const myFunctionReference = internal.myModule.myFunction;
 * ```
 */
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;

export declare const components: {};
