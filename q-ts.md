https://www.typescriptlang.org/play?&q=164#code/PQKhCgAIUhFBGKJjnASwHYBcCmAnAMwEMBjHSAYQHsAbKvANSLzSOwGdIBvKSPgBxYBbZgE8AXJADkAIxoBXHFIDcvPuxwkqGACZjJUvDh0q1kXHiys8E6QHMjODKYC+qLKP7kACsLHU6PEgAXkpaeiYWNix2AG0pQTQRGykAXUhgYGk5RSl3T3IAOW1fJP9woNC2UQysw2MpSAAfe0dnfK9IAFEAN3xRAPoQyGra7IUlZukjEympBxwnPPBQCGg4ACYkFHAPToAZHCwLTlD4oikAGmyr6RI0jvIAQQB5PAAhYdHM6Qu5mWWe3Ih2O+C+GBqPykfxaskasPuqFWSDgAGZtqhMBZiGRIABVDR4ABKtBw1AwBDQdm4ZnkhMk8R6aBwAHc0qo+Op5F48E8dEJMAypCQjERcLcpNy9OLrlIdDgaEclKlVG5dgVICTFeDIXUmaz4XdReK5lKxZNYfLFeKkWAUbAACwYoHdbBoDzDLjmAoGOn4RouKZeoEGfhUdhYANB71eAxaIRCJyRyBql1dN0eADq7oAFgBJHSetXI9aAfHNANjmknTVizuYLkEAp0aASHNAMbWgDsPQAhboBvH0A0eqALO1AJJyGPAWgwEcgfrwVYzomzWHzhdCwZ90knt0nBd98ADI+04-jiew05rs7ri+4MZwcaoCaTtwPSc3d23Kd3Y6wkDDEeP7tP8-rS6XqG4aRtcX5YE+CQvm4QA

```ts
/**
 * Q1
 */

interface ColorVariants {
    primary: 'blue';
    secondary: 'red';
    tertiary: 'green';
}

type PrimaryColor = ColorVariants['primary'] // 'blue'

type NonPrimaryColor = any // 'red' | 'green'

type EveryColor = any // 'blue' | 'red' | 'green'

/**
 * Q2
 */

type Letters = ['a', 'b', 'c']

type AOrB = any // 'a' | 'b'

type Letter = any // 'a' | 'b' | 'c'

/**
 * Q3
 */

interface UserRoleConfig {
    user: ['view'];
    superAdmin: ['create', 'update', 'delete'];
}

type Role = any // 'view' | 'create' | 'update' | 'delete'

/**
 * Q4
 */
type Entity = { type: 'user' } | { type: 'post' } | { type: 'comment' }

type EntityWithId = {}

/**
 * 期望: EntityWithId 拥有正确的类型定义
 */

const user: EntityWithId = { type: 'user', userId: 'u1' }
const comment: EntityWithId = { type: 'comment', commentId: 'c1' }
const post: EntityWithId = { type: 'post', postId: 'p1' }

```

