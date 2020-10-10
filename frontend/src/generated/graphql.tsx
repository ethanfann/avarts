import gql from 'graphql-tag';
import * as ApolloReactCommon from '@apollo/react-common';
import * as React from 'react';
import * as ApolloReactComponents from '@apollo/react-components';
import * as ApolloReactHoc from '@apollo/react-hoc';
import * as ApolloReactHooks from '@apollo/react-hooks';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO 8601-encoded datetime */
  ISO8601DateTime: any;
  /** Represents untyped JSON */
  JSON: any;
  Upload: any;
};

export type Activity = {
  __typename?: 'Activity';
  comments: Array<ActivityComment>;
  createdAt: Scalars['ISO8601DateTime'];
  description: Scalars['String'];
  geoJson: Scalars['JSON'];
  id: Scalars['ID'];
  title: Scalars['String'];
  updatedAt: Scalars['ISO8601DateTime'];
  user: User;
  userId: Scalars['ID'];
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
};


export type QueryActivitiesByUserIdArgs = {
  userId: Scalars['ID'];
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
    & Pick<Activity, 'id' | 'title' | 'description' | 'geoJson' | 'createdAt'>
    & { user: (
      { __typename?: 'User' }
      & Pick<User, 'name' | 'img'>
    ), comments: Array<(
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
    & Pick<User, 'id' | 'name' | 'email' | 'img' | 'activityCount' | 'firstName' | 'lastName'>
    & { latestActivity?: Maybe<(
      { __typename?: 'Activity' }
      & Pick<Activity, 'title' | 'createdAt'>
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
export type AddActivityCommentMutationFn = ApolloReactCommon.MutationFunction<AddActivityCommentMutation, AddActivityCommentMutationVariables>;
export type AddActivityCommentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<AddActivityCommentMutation, AddActivityCommentMutationVariables>, 'mutation'>;

    export const AddActivityCommentComponent = (props: AddActivityCommentComponentProps) => (
      <ApolloReactComponents.Mutation<AddActivityCommentMutation, AddActivityCommentMutationVariables> mutation={AddActivityCommentDocument} {...props} />
    );
    
export type AddActivityCommentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<AddActivityCommentMutation, AddActivityCommentMutationVariables>
    } & TChildProps;
export function withAddActivityComment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  AddActivityCommentMutation,
  AddActivityCommentMutationVariables,
  AddActivityCommentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, AddActivityCommentMutation, AddActivityCommentMutationVariables, AddActivityCommentProps<TChildProps, TDataName>>(AddActivityCommentDocument, {
      alias: 'addActivityComment',
      ...operationOptions
    });
};

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
export function useAddActivityCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<AddActivityCommentMutation, AddActivityCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<AddActivityCommentMutation, AddActivityCommentMutationVariables>(AddActivityCommentDocument, baseOptions);
      }
export type AddActivityCommentMutationHookResult = ReturnType<typeof useAddActivityCommentMutation>;
export type AddActivityCommentMutationResult = ApolloReactCommon.MutationResult<AddActivityCommentMutation>;
export type AddActivityCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<AddActivityCommentMutation, AddActivityCommentMutationVariables>;
export const DeleteActivityCommentDocument = gql`
    mutation DeleteActivityComment($commentId: ID!) {
  deleteActivityComment(commentId: $commentId) {
    id
  }
}
    `;
export type DeleteActivityCommentMutationFn = ApolloReactCommon.MutationFunction<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>;
export type DeleteActivityCommentComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>, 'mutation'>;

    export const DeleteActivityCommentComponent = (props: DeleteActivityCommentComponentProps) => (
      <ApolloReactComponents.Mutation<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables> mutation={DeleteActivityCommentDocument} {...props} />
    );
    
export type DeleteActivityCommentProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>
    } & TChildProps;
export function withDeleteActivityComment<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  DeleteActivityCommentMutation,
  DeleteActivityCommentMutationVariables,
  DeleteActivityCommentProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables, DeleteActivityCommentProps<TChildProps, TDataName>>(DeleteActivityCommentDocument, {
      alias: 'deleteActivityComment',
      ...operationOptions
    });
};

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
export function useDeleteActivityCommentMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>) {
        return ApolloReactHooks.useMutation<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>(DeleteActivityCommentDocument, baseOptions);
      }
export type DeleteActivityCommentMutationHookResult = ReturnType<typeof useDeleteActivityCommentMutation>;
export type DeleteActivityCommentMutationResult = ApolloReactCommon.MutationResult<DeleteActivityCommentMutation>;
export type DeleteActivityCommentMutationOptions = ApolloReactCommon.BaseMutationOptions<DeleteActivityCommentMutation, DeleteActivityCommentMutationVariables>;
export const LoginDocument = gql`
    mutation login($email: String!, $password: String!) {
  login(email: $email, password: $password) {
    token
  }
}
    `;
export type LoginMutationFn = ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>;
export type LoginComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<LoginMutation, LoginMutationVariables>, 'mutation'>;

    export const LoginComponent = (props: LoginComponentProps) => (
      <ApolloReactComponents.Mutation<LoginMutation, LoginMutationVariables> mutation={LoginDocument} {...props} />
    );
    
export type LoginProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<LoginMutation, LoginMutationVariables>
    } & TChildProps;
export function withLogin<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  LoginMutation,
  LoginMutationVariables,
  LoginProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, LoginMutation, LoginMutationVariables, LoginProps<TChildProps, TDataName>>(LoginDocument, {
      alias: 'login',
      ...operationOptions
    });
};

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
export function useLoginMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return ApolloReactHooks.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = ApolloReactCommon.MutationResult<LoginMutation>;
export type LoginMutationOptions = ApolloReactCommon.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const SignUpDocument = gql`
    mutation signUp($email: String!, $firstName: String!, $lastName: String!, $password: String!, $passwordConfirmation: String!) {
  signUp(attributes: {email: $email, firstName: $firstName, lastName: $lastName, password: $password, passwordConfirmation: $passwordConfirmation}) {
    token
  }
}
    `;
export type SignUpMutationFn = ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>;
export type SignUpComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<SignUpMutation, SignUpMutationVariables>, 'mutation'>;

    export const SignUpComponent = (props: SignUpComponentProps) => (
      <ApolloReactComponents.Mutation<SignUpMutation, SignUpMutationVariables> mutation={SignUpDocument} {...props} />
    );
    
export type SignUpProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<SignUpMutation, SignUpMutationVariables>
    } & TChildProps;
export function withSignUp<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  SignUpMutation,
  SignUpMutationVariables,
  SignUpProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, SignUpMutation, SignUpMutationVariables, SignUpProps<TChildProps, TDataName>>(SignUpDocument, {
      alias: 'signUp',
      ...operationOptions
    });
};

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
export function useSignUpMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        return ApolloReactHooks.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, baseOptions);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = ApolloReactCommon.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = ApolloReactCommon.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateUserImgDocument = gql`
    mutation updateUserImg($img: Upload!) {
  updateImg(img: $img) {
    img
  }
}
    `;
export type UpdateUserImgMutationFn = ApolloReactCommon.MutationFunction<UpdateUserImgMutation, UpdateUserImgMutationVariables>;
export type UpdateUserImgComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserImgMutation, UpdateUserImgMutationVariables>, 'mutation'>;

    export const UpdateUserImgComponent = (props: UpdateUserImgComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserImgMutation, UpdateUserImgMutationVariables> mutation={UpdateUserImgDocument} {...props} />
    );
    
export type UpdateUserImgProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserImgMutation, UpdateUserImgMutationVariables>
    } & TChildProps;
export function withUpdateUserImg<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserImgMutation,
  UpdateUserImgMutationVariables,
  UpdateUserImgProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserImgMutation, UpdateUserImgMutationVariables, UpdateUserImgProps<TChildProps, TDataName>>(UpdateUserImgDocument, {
      alias: 'updateUserImg',
      ...operationOptions
    });
};

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
export function useUpdateUserImgMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserImgMutation, UpdateUserImgMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserImgMutation, UpdateUserImgMutationVariables>(UpdateUserImgDocument, baseOptions);
      }
export type UpdateUserImgMutationHookResult = ReturnType<typeof useUpdateUserImgMutation>;
export type UpdateUserImgMutationResult = ApolloReactCommon.MutationResult<UpdateUserImgMutation>;
export type UpdateUserImgMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserImgMutation, UpdateUserImgMutationVariables>;
export const UpdateUserNameDocument = gql`
    mutation updateUserName($firstName: String!, $lastName: String!) {
  updateName(firstName: $firstName, lastName: $lastName) {
    name
  }
}
    `;
export type UpdateUserNameMutationFn = ApolloReactCommon.MutationFunction<UpdateUserNameMutation, UpdateUserNameMutationVariables>;
export type UpdateUserNameComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>, 'mutation'>;

    export const UpdateUserNameComponent = (props: UpdateUserNameComponentProps) => (
      <ApolloReactComponents.Mutation<UpdateUserNameMutation, UpdateUserNameMutationVariables> mutation={UpdateUserNameDocument} {...props} />
    );
    
export type UpdateUserNameProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UpdateUserNameMutation, UpdateUserNameMutationVariables>
    } & TChildProps;
export function withUpdateUserName<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UpdateUserNameMutation,
  UpdateUserNameMutationVariables,
  UpdateUserNameProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UpdateUserNameMutation, UpdateUserNameMutationVariables, UpdateUserNameProps<TChildProps, TDataName>>(UpdateUserNameDocument, {
      alias: 'updateUserName',
      ...operationOptions
    });
};

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
export function useUpdateUserNameMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>) {
        return ApolloReactHooks.useMutation<UpdateUserNameMutation, UpdateUserNameMutationVariables>(UpdateUserNameDocument, baseOptions);
      }
export type UpdateUserNameMutationHookResult = ReturnType<typeof useUpdateUserNameMutation>;
export type UpdateUserNameMutationResult = ApolloReactCommon.MutationResult<UpdateUserNameMutation>;
export type UpdateUserNameMutationOptions = ApolloReactCommon.BaseMutationOptions<UpdateUserNameMutation, UpdateUserNameMutationVariables>;
export const UploadActivityDocument = gql`
    mutation uploadActivity($title: String!, $description: String!, $fitFile: Upload!, $userId: ID!) {
  upload(title: $title, description: $description, fitFile: $fitFile, userId: $userId) {
    id
  }
}
    `;
export type UploadActivityMutationFn = ApolloReactCommon.MutationFunction<UploadActivityMutation, UploadActivityMutationVariables>;
export type UploadActivityComponentProps = Omit<ApolloReactComponents.MutationComponentOptions<UploadActivityMutation, UploadActivityMutationVariables>, 'mutation'>;

    export const UploadActivityComponent = (props: UploadActivityComponentProps) => (
      <ApolloReactComponents.Mutation<UploadActivityMutation, UploadActivityMutationVariables> mutation={UploadActivityDocument} {...props} />
    );
    
export type UploadActivityProps<TChildProps = {}, TDataName extends string = 'mutate'> = {
      [key in TDataName]: ApolloReactCommon.MutationFunction<UploadActivityMutation, UploadActivityMutationVariables>
    } & TChildProps;
export function withUploadActivity<TProps, TChildProps = {}, TDataName extends string = 'mutate'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  UploadActivityMutation,
  UploadActivityMutationVariables,
  UploadActivityProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withMutation<TProps, UploadActivityMutation, UploadActivityMutationVariables, UploadActivityProps<TChildProps, TDataName>>(UploadActivityDocument, {
      alias: 'uploadActivity',
      ...operationOptions
    });
};

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
export function useUploadActivityMutation(baseOptions?: ApolloReactHooks.MutationHookOptions<UploadActivityMutation, UploadActivityMutationVariables>) {
        return ApolloReactHooks.useMutation<UploadActivityMutation, UploadActivityMutationVariables>(UploadActivityDocument, baseOptions);
      }
export type UploadActivityMutationHookResult = ReturnType<typeof useUploadActivityMutation>;
export type UploadActivityMutationResult = ApolloReactCommon.MutationResult<UploadActivityMutation>;
export type UploadActivityMutationOptions = ApolloReactCommon.BaseMutationOptions<UploadActivityMutation, UploadActivityMutationVariables>;
export const ActivitiesByUserIdDocument = gql`
    query activitiesByUserId($userId: ID!) {
  activitiesByUserId(userId: $userId) {
    id
    title
    description
    geoJson
    createdAt
    user {
      name
      img
    }
    comments {
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
export type ActivitiesByUserIdComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>, 'query'> & ({ variables: ActivitiesByUserIdQueryVariables; skip?: boolean; } | { skip: boolean; });

    export const ActivitiesByUserIdComponent = (props: ActivitiesByUserIdComponentProps) => (
      <ApolloReactComponents.Query<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables> query={ActivitiesByUserIdDocument} {...props} />
    );
    
export type ActivitiesByUserIdProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>
    } & TChildProps;
export function withActivitiesByUserId<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  ActivitiesByUserIdQuery,
  ActivitiesByUserIdQueryVariables,
  ActivitiesByUserIdProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables, ActivitiesByUserIdProps<TChildProps, TDataName>>(ActivitiesByUserIdDocument, {
      alias: 'activitiesByUserId',
      ...operationOptions
    });
};

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
export function useActivitiesByUserIdQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>) {
        return ApolloReactHooks.useQuery<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>(ActivitiesByUserIdDocument, baseOptions);
      }
export function useActivitiesByUserIdLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>(ActivitiesByUserIdDocument, baseOptions);
        }
export type ActivitiesByUserIdQueryHookResult = ReturnType<typeof useActivitiesByUserIdQuery>;
export type ActivitiesByUserIdLazyQueryHookResult = ReturnType<typeof useActivitiesByUserIdLazyQuery>;
export type ActivitiesByUserIdQueryResult = ApolloReactCommon.QueryResult<ActivitiesByUserIdQuery, ActivitiesByUserIdQueryVariables>;
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
    }
    activityCount
    firstName
    lastName
  }
}
    `;
export type MeComponentProps = Omit<ApolloReactComponents.QueryComponentOptions<MeQuery, MeQueryVariables>, 'query'>;

    export const MeComponent = (props: MeComponentProps) => (
      <ApolloReactComponents.Query<MeQuery, MeQueryVariables> query={MeDocument} {...props} />
    );
    
export type MeProps<TChildProps = {}, TDataName extends string = 'data'> = {
      [key in TDataName]: ApolloReactHoc.DataValue<MeQuery, MeQueryVariables>
    } & TChildProps;
export function withMe<TProps, TChildProps = {}, TDataName extends string = 'data'>(operationOptions?: ApolloReactHoc.OperationOption<
  TProps,
  MeQuery,
  MeQueryVariables,
  MeProps<TChildProps, TDataName>>) {
    return ApolloReactHoc.withQuery<TProps, MeQuery, MeQueryVariables, MeProps<TChildProps, TDataName>>(MeDocument, {
      alias: 'me',
      ...operationOptions
    });
};

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
export function useMeQuery(baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: ApolloReactHooks.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<MeQuery, MeQueryVariables>;