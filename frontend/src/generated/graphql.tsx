import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  Upload: any;
};

export type Activity = {
  __typename?: 'Activity';
  activityComment: Array<ActivityComment>;
  createdAt: Scalars['ISO8601DateTime'];
  description: Scalars['String'];
  distance: Scalars['Int'];
  duration: Scalars['Int'];
  elevation: Scalars['Int'];
  id: Scalars['ID'];
  polyline: Scalars['String'];
  startTime: Scalars['Int'];
  title: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
  user: User;
};

export type ActivityComment = {
  __typename?: 'ActivityComment';
  comment: Scalars['String'];
  createdAt: Scalars['ISO8601DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['ISO8601DateTime'];
  user: User;
};


export type Mutation = {
  __typename?: 'Mutation';
  addActivityComment?: Maybe<ActivityComment>;
  deleteActivityComment?: Maybe<ActivityComment>;
  /** Login for users */
  login?: Maybe<User>;
  /** Logout for users */
  logout?: Maybe<Scalars['Boolean']>;
  /** Unlock the user account */
  resendUnlockInstructions: Scalars['Boolean'];
  /** Set the new password */
  resetPassword?: Maybe<Scalars['Boolean']>;
  /** Send password reset instructions to users email */
  sendResetPasswordInstructions?: Maybe<Scalars['Boolean']>;
  /** Sign up for users */
  signUp?: Maybe<User>;
  /** JWT token login */
  tokenLogin?: Maybe<User>;
  /** Unlock the user account */
  unlock: Scalars['Boolean'];
  /** Update user img */
  updateImg?: Maybe<User>;
  /** Update user name */
  updateName?: Maybe<User>;
  /** Update user */
  updateUser?: Maybe<User>;
  upload?: Maybe<Activity>;
};


export type MutationAddActivityCommentArgs = {
  activityId: Scalars['ID'];
  comment: Scalars['String'];
  userId: Scalars['ID'];
};


export type MutationDeleteActivityCommentArgs = {
  commentId: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationResendUnlockInstructionsArgs = {
  email: Scalars['String'];
};


export type MutationResetPasswordArgs = {
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
  resetPasswordToken: Scalars['String'];
};


export type MutationSendResetPasswordInstructionsArgs = {
  email: Scalars['String'];
};


export type MutationSignUpArgs = {
  attributes: UserInput;
};


export type MutationUnlockArgs = {
  unlockToken: Scalars['String'];
};


export type MutationUpdateImgArgs = {
  img: Scalars['Upload'];
};


export type MutationUpdateNameArgs = {
  firstName?: Maybe<Scalars['String']>;
  lastName?: Maybe<Scalars['String']>;
};


export type MutationUpdateUserArgs = {
  password?: Maybe<Scalars['String']>;
  passwordConfirmation?: Maybe<Scalars['String']>;
};


export type MutationUploadArgs = {
  description: Scalars['String'];
  fitFile: Scalars['Upload'];
  title: Scalars['String'];
  userId: Scalars['ID'];
};

export type Query = {
  __typename?: 'Query';
  /** Returns the activities belonging to the specified user_id */
  activitiesByUserId?: Maybe<Array<Activity>>;
  /** Returns the current user */
  me?: Maybe<User>;
  /** Returns the activities for the previous month */
  monthlyActivity: Array<Activity>;
  /** Returns the current user's activities */
  myActivities: Array<Activity>;
  /** Ping Pong */
  ping: Scalars['String'];
};


export type QueryActivitiesByUserIdArgs = {
  userId: Scalars['ID'];
};


export type QueryMyActivitiesArgs = {
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
};


export type User = {
  __typename?: 'User';
  activityCount?: Maybe<Scalars['Int']>;
  createdAt: Scalars['ISO8601DateTime'];
  email?: Maybe<Scalars['String']>;
  firstName: Scalars['String'];
  id: Scalars['ID'];
  img: Scalars['String'];
  lastName: Scalars['String'];
  latestActivity?: Maybe<Activity>;
  name: Scalars['String'];
  strokeColor: Scalars['String'];
  token: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
};

/** Attributes to create a user. */
export type UserInput = {
  /** Email of user */
  email: Scalars['String'];
  /** Firstname of user */
  firstName: Scalars['String'];
  /** Lastname of user */
  lastName: Scalars['String'];
  /** Password of user */
  password: Scalars['String'];
  /** Password confirmation */
  passwordConfirmation: Scalars['String'];
};

export type AddActivityCommentMutationVariables = Exact<{
  comment: Scalars['String'];
  userId: Scalars['ID'];
  activityId: Scalars['ID'];
}>;


export type AddActivityCommentMutation = (
  { __typename?: 'Mutation' }
  & { addActivityComment?: Maybe<(
    { __typename?: 'ActivityComment' }
    & Pick<ActivityComment, 'id'>
  )> }
);

export type DeleteActivityCommentMutationVariables = Exact<{
  commentId: Scalars['ID'];
}>;


export type DeleteActivityCommentMutation = (
  { __typename?: 'Mutation' }
  & { deleteActivityComment?: Maybe<(
    { __typename?: 'ActivityComment' }
    & Pick<ActivityComment, 'id'>
  )> }
);

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'token'>
  )> }
);

export type SignUpMutationVariables = Exact<{
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  password: Scalars['String'];
  passwordConfirmation: Scalars['String'];
}>;


export type SignUpMutation = (
  { __typename?: 'Mutation' }
  & { signUp?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'token'>
  )> }
);

export type UpdateUserImgMutationVariables = Exact<{
  img: Scalars['Upload'];
}>;


export type UpdateUserImgMutation = (
  { __typename?: 'Mutation' }
  & { updateImg?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'img'>
  )> }
);

export type UpdateUserNameMutationVariables = Exact<{
  firstName: Scalars['String'];
  lastName: Scalars['String'];
}>;


export type UpdateUserNameMutation = (
  { __typename?: 'Mutation' }
  & { updateName?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'name'>
  )> }
);

export type UploadActivityMutationVariables = Exact<{
  title: Scalars['String'];
  description: Scalars['String'];
  fitFile: Scalars['Upload'];
  userId: Scalars['ID'];
}>;


export type UploadActivityMutation = (
  { __typename?: 'Mutation' }
  & { upload?: Maybe<(
    { __typename?: 'Activity' }
    & Pick<Activity, 'id'>
  )> }
);

export type ActivitiesByUserIdQueryVariables = Exact<{
  userId: Scalars['ID'];
}>;


export type ActivitiesByUserIdQuery = (
  { __typename?: 'Query' }
  & { activitiesByUserId?: Maybe<Array<(
    { __typename?: 'Activity' }
    & Pick<Activity, 'id' | 'title' | 'description' | 'polyline' | 'startTime' | 'duration' | 'elevation' | 'distance' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'img'>
    ), activityComment: Array<(
      { __typename?: 'ActivityComment' }
      & Pick<ActivityComment, 'id' | 'comment'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'img'>
      ) }
    )> }
  )>> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'name' | 'email' | 'img' | 'activityCount' | 'firstName' | 'lastName' | 'strokeColor'>
    & { latestActivity?: Maybe<(
      { __typename?: 'Activity' }
      & Pick<Activity, 'title' | 'createdAt' | 'startTime'>
    )> }
  )> }
);

export type MonthlyActivityQueryVariables = Exact<{ [key: string]: never; }>;


export type MonthlyActivityQuery = (
  { __typename?: 'Query' }
  & { monthlyActivity: Array<(
    { __typename?: 'Activity' }
    & Pick<Activity, 'distance' | 'createdAt' | 'startTime'>
  )> }
);

export type MyActivitiesQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  offset?: Maybe<Scalars['Int']>;
}>;


export type MyActivitiesQuery = (
  { __typename?: 'Query' }
  & { myActivities: Array<(
    { __typename?: 'Activity' }
    & Pick<Activity, 'id' | 'title' | 'description' | 'polyline' | 'startTime' | 'duration' | 'elevation' | 'distance' | 'createdAt' | 'updatedAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'name' | 'img' | 'strokeColor' | 'token'>
    ), activityComment: Array<(
      { __typename?: 'ActivityComment' }
      & Pick<ActivityComment, 'id' | 'comment' | 'createdAt' | 'updatedAt'>
      & { user: (
        { __typename?: 'User' }
        & Pick<User, 'name' | 'img' | 'createdAt' | 'updatedAt' | 'firstName' | 'lastName'>
      ) }
    )> }
  )> }
);


export const AddActivityCommentDocument = gql`
    mutation AddActivityComment($comment: String!, $userId: ID!, $activityId: ID!) {
  addActivityComment(comment: $comment, userId: $userId, activityId: $activityId) {
    id
  }
}
    `;
export type AddActivityCommentMutationFn = Apollo.MutationFunction<AddActivityCommentMutation, AddActivityCommentMutationVariables>;

/**
 * __useAddActivityCommentMutation__
 *
 * To run a mutation, you first call `useAddActivityCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddActivityCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addActivityCommentMutation, { data, loading, error }] = useAddActivityCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      userId: // value for 'userId'
 *      activityId: // value for 'activityId'
 *   },
 * });
 */
export function useAddActivityCommentMutation(baseOptions?: Apollo.MutationHookOptions<AddActivityCommentMutation, AddActivityCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddActivityCommentMutation, AddActivityCommentMutationVariables>(AddActivityCommentDocument, options);
      }
export type AddActivityCommentMutationHookResult = ReturnType<typeof useAddActivityCommentMutation>;
export type AddActivityCommentMutationResult = Apollo.MutationResult<AddActivityCommentMutation>;
export type AddActivityCommentMutationOptions = Apollo.BaseMutationOptions<AddActivityCommentMutation, AddActivityCommentMutationVariables>;
export const DeleteActivityCommentDocument = gql`
    mutation DeleteActivityComment($commentId: ID!) {
  deleteActivityComment(commentId: $commentId) {
    id
  }
}
    `;
export type DeleteActivityCommentMutationFn = Apollo.MutationFunction<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>;

/**
 * __useDeleteActivityCommentMutation__
 *
 * To run a mutation, you first call `useDeleteActivityCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteActivityCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteActivityCommentMutation, { data, loading, error }] = useDeleteActivityCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *   },
 * });
 */
export function useDeleteActivityCommentMutation(baseOptions?: Apollo.MutationHookOptions<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>(DeleteActivityCommentDocument, options);
      }
export type DeleteActivityCommentMutationHookResult = ReturnType<typeof useDeleteActivityCommentMutation>;
export type DeleteActivityCommentMutationResult = Apollo.MutationResult<DeleteActivityCommentMutation>;
export type DeleteActivityCommentMutationOptions = Apollo.BaseMutationOptions<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($email: String!, $firstName: String!, $lastName: String!, $password: String!, $passwordConfirmation: String!) {
  signUp(attributes: {email: $email, firstName: $firstName, lastName: $lastName, password: $password, passwordConfirmation: $passwordConfirmation}) {
    token
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      email: // value for 'email'
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *      password: // value for 'password'
 *      passwordConfirmation: // value for 'passwordConfirmation'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateUserImgDocument = gql`
    mutation updateUserImg($img: Upload!) {
  updateImg(img: $img) {
    img
  }
}
    `;
export type UpdateUserImgMutationFn = Apollo.MutationFunction<UpdateUserImgMutation, UpdateUserImgMutationVariables>;

/**
 * __useUpdateUserImgMutation__
 *
 * To run a mutation, you first call `useUpdateUserImgMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserImgMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserImgMutation, { data, loading, error }] = useUpdateUserImgMutation({
 *   variables: {
 *      img: // value for 'img'
 *   },
 * });
 */
export function useUpdateUserImgMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserImgMutation, UpdateUserImgMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserImgMutation, UpdateUserImgMutationVariables>(UpdateUserImgDocument, options);
      }
export type UpdateUserImgMutationHookResult = ReturnType<typeof useUpdateUserImgMutation>;
export type UpdateUserImgMutationResult = Apollo.MutationResult<UpdateUserImgMutation>;
export type UpdateUserImgMutationOptions = Apollo.BaseMutationOptions<UpdateUserImgMutation, UpdateUserImgMutationVariables>;
export const UpdateUserNameDocument = gql`
    mutation updateUserName($firstName: String!, $lastName: String!) {
  updateName(firstName: $firstName, lastName: $lastName) {
    name
  }
}
    `;
export type UpdateUserNameMutationFn = Apollo.MutationFunction<UpdateUserNameMutation, UpdateUserNameMutationVariables>;

/**
 * __useUpdateUserNameMutation__
 *
 * To run a mutation, you first call `useUpdateUserNameMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUserNameMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUserNameMutation, { data, loading, error }] = useUpdateUserNameMutation({
 *   variables: {
 *      firstName: // value for 'firstName'
 *      lastName: // value for 'lastName'
 *   },
 * });
 */
export function useUpdateUserNameMutation(baseOptions?: Apollo.MutationHookOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(UpdateUserNameDocument, options);
      }
export type UpdateUserNameMutationHookResult = ReturnType<typeof useUpdateUserNameMutation>;
export type UpdateUserNameMutationResult = Apollo.MutationResult<UpdateUserNameMutation>;
export type UpdateUserNameMutationOptions = Apollo.BaseMutationOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>;
export const UploadActivityDocument = gql`
    mutation uploadActivity($title: String!, $description: String!, $fitFile: Upload!, $userId: ID!) {
  upload(title: $title, description: $description, fitFile: $fitFile, userId: $userId) {
    id
  }
}
    `;
export type UploadActivityMutationFn = Apollo.MutationFunction<UploadActivityMutation, UploadActivityMutationVariables>;

/**
 * __useUploadActivityMutation__
 *
 * To run a mutation, you first call `useUploadActivityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadActivityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadActivityMutation, { data, loading, error }] = useUploadActivityMutation({
 *   variables: {
 *      title: // value for 'title'
 *      description: // value for 'description'
 *      fitFile: // value for 'fitFile'
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUploadActivityMutation(baseOptions?: Apollo.MutationHookOptions<UploadActivityMutation, UploadActivityMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UploadActivityMutation, UploadActivityMutationVariables>(UploadActivityDocument, options);
      }
export type UploadActivityMutationHookResult = ReturnType<typeof useUploadActivityMutation>;
export type UploadActivityMutationResult = Apollo.MutationResult<UploadActivityMutation>;
export type UploadActivityMutationOptions = Apollo.BaseMutationOptions<UploadActivityMutation, UploadActivityMutationVariables>;
export const ActivitiesByUserIdDocument = gql`
    query activitiesByUserId($userId: ID!) {
  activitiesByUserId(userId: $userId) {
    id
    title
    description
    polyline
    startTime
    duration
    elevation
    distance
    createdAt
    user {
      name
      img
    }
    activityComment {
      id
      comment
      user {
        name
        img
      }
    }
  }
}
    `;

/**
 * __useActivitiesByUserIdQuery__
 *
 * To run a query within a React component, call `useActivitiesByUserIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useActivitiesByUserIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useActivitiesByUserIdQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useActivitiesByUserIdQuery(baseOptions: Apollo.QueryHookOptions<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>(ActivitiesByUserIdDocument, options);
      }
export function useActivitiesByUserIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>(ActivitiesByUserIdDocument, options);
        }
export type ActivitiesByUserIdQueryHookResult = ReturnType<typeof useActivitiesByUserIdQuery>;
export type ActivitiesByUserIdLazyQueryHookResult = ReturnType<typeof useActivitiesByUserIdLazyQuery>;
export type ActivitiesByUserIdQueryResult = Apollo.QueryResult<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>;
export const MeDocument = gql`
    query me {
  me {
    id
    name
    email
    img
    latestActivity {
      title
      createdAt
      startTime
    }
    activityCount
    firstName
    lastName
    strokeColor
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const MonthlyActivityDocument = gql`
    query monthlyActivity {
  monthlyActivity {
    distance
    createdAt
    startTime
  }
}
    `;

/**
 * __useMonthlyActivityQuery__
 *
 * To run a query within a React component, call `useMonthlyActivityQuery` and pass it any options that fit your needs.
 * When your component renders, `useMonthlyActivityQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMonthlyActivityQuery({
 *   variables: {
 *   },
 * });
 */
export function useMonthlyActivityQuery(baseOptions?: Apollo.QueryHookOptions<MonthlyActivityQuery, MonthlyActivityQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MonthlyActivityQuery, MonthlyActivityQueryVariables>(MonthlyActivityDocument, options);
      }
export function useMonthlyActivityLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MonthlyActivityQuery, MonthlyActivityQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MonthlyActivityQuery, MonthlyActivityQueryVariables>(MonthlyActivityDocument, options);
        }
export type MonthlyActivityQueryHookResult = ReturnType<typeof useMonthlyActivityQuery>;
export type MonthlyActivityLazyQueryHookResult = ReturnType<typeof useMonthlyActivityLazyQuery>;
export type MonthlyActivityQueryResult = Apollo.QueryResult<MonthlyActivityQuery, MonthlyActivityQueryVariables>;
export const MyActivitiesDocument = gql`
    query myActivities($limit: Int, $offset: Int) {
  myActivities(limit: $limit, offset: $offset) {
    id
    title
    description
    polyline
    startTime
    duration
    elevation
    distance
    createdAt
    updatedAt
    user {
      id
      name
      img
      strokeColor
      token
    }
    activityComment {
      id
      comment
      createdAt
      updatedAt
      user {
        name
        img
        createdAt
        updatedAt
        firstName
        lastName
      }
    }
  }
}
    `;

/**
 * __useMyActivitiesQuery__
 *
 * To run a query within a React component, call `useMyActivitiesQuery` and pass it any options that fit your needs.
 * When your component renders, `useMyActivitiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMyActivitiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      offset: // value for 'offset'
 *   },
 * });
 */
export function useMyActivitiesQuery(baseOptions?: Apollo.QueryHookOptions<MyActivitiesQuery, MyActivitiesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<MyActivitiesQuery, MyActivitiesQueryVariables>(MyActivitiesDocument, options);
      }
export function useMyActivitiesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MyActivitiesQuery, MyActivitiesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<MyActivitiesQuery, MyActivitiesQueryVariables>(MyActivitiesDocument, options);
        }
export type MyActivitiesQueryHookResult = ReturnType<typeof useMyActivitiesQuery>;
export type MyActivitiesLazyQueryHookResult = ReturnType<typeof useMyActivitiesLazyQuery>;
export type MyActivitiesQueryResult = Apollo.QueryResult<MyActivitiesQuery, MyActivitiesQueryVariables>;