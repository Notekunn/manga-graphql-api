# manga-api
Api for app manga sử dụng graphql

[Playground](https://manga-graphql-api.herokuapp.com/playground)
```typescript
scalar Date

schema {
  query: RootQuery
  mutation: RootMutation
}

type AuthData {
  userId: ID!
  token: String!
  tokenExpiration: Date!
}

type Category {
  _id: ID
  title: String!
  slug: String
  description: String
}

input CategoryFilter {
  _id: ID
  title: String
  slug: String
}

input CategoryInput {
  title: String!
  description: String
}

enum Permission {
  admin
  moderator
  translator
  member
}

type User {
  _id: ID
  userName: String!
  name: String
  email: String!
  avatarUrl: String
  permission: Permission
  createdAt: Date
}

input UserFilter {
  _id: ID
  userName: String
  name: String
  email: String
  permission: Permission
}

input UserInput {
  userName: String!
  password: String!
  name: String
  email: String
}

type Artist {
  _id: ID
  name: String!
  slug: String
  about: String
  coverUrl: String
}

input ArtistFilter {
  _id: ID
  name: String
  slug: String
}

input ArtistInput {
  name: String
  about: String
  coverUrl: String
}

type TranslatorGroup {
  _id: ID
  name: String
  description: String
  members: [User!]!
  manager: User!
  createdAt: Date
}

input TranslatorGroupFilter {
  _id: ID
  name: String
  manager: ID
}

type RootQuery {
  category(filter: CategoryFilter): Category
  categories(filter: CategoryFilter): [Category!]!
  user(filter: UserFilter): User
  users(filter: UserFilter): [User!]!
  artist(filter: ArtistFilter): Artist
  artists(filter: ArtistFilter): [Artist!]!
  translatorGroup(filter: TranslatorGroupFilter): TranslatorGroup
  translatorGroups(filter: TranslatorGroupFilter): [TranslatorGroup!]!
}

type RootMutation {
  createCategory(categoryInput: CategoryInput!): Category!
  register(userInput: UserInput!): User!
  login(userInput: UserInput): AuthData!
}

```

### TO-DO List

- [x] Use case diagram
- [x] Viết api document [Schema](https://manga-graphql-api.herokuapp.com/playground)

### Actor: Anonymous
- [x] Đăng nhập - Đăng xuất
- [ ] Đọc truyện

### Actor: Member

- [ ] Theo dõi truyện
- [ ] Tìm kiếm truyện

### Actor: Translator

- [ ] Đăng tập truyện nhóm đã đăng ký(cần yêu cầu kiểm duyệt)
- [ ] Yêu cầu tham gia nhóm dịch
- [ ] Yêu cầu dịch bộ truyện

### Actor: Moderator

- [ ] Quản lý thành viên, yêu cầu tham gia nhóm dịch
- [ ] Quản lý truyện, yêu cầu dịch truyện
- [ ] Quản lý thể loại
- [ ] Quản lý user

### Actor: Administrator

- [ ] Quản lý moderator
- [ ] Quản lý tool

## Database Schema

- Simple schema (updating...)
![Schema](https://i.imgur.com/YacmMHv.png)
