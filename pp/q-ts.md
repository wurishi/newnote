https://www.typescriptlang.org/play?&q=164#code/PQKhCgAIUhFBGKJjnASwHYBcCmAnAMwEMBjHSAYQHsAbKvANSLzSOwGdIBvKSPgBxYBbZgE8AXJADkAIxoBXHFIDcvPuxwkqGACZjJUvDh0q1kXHiys8E6QHMjODKYC+qLKP7kACsLHU6PEgAXkpaeiYWNix2AG0pQTQRGykAXUhgYGk5RSl3T3IAOW1fJP9woNC2UQysw2MpSAAfe0dnfK9IAFEAN3xRAPoQyGra7IUlZukjEympBxwnPPBQCGg4ACYkFHAPToAZHCwLTlD4oikAGmyr6RI0jvIAQQB5PAAhYdHM6Qu5mWWe3Ih2O+C+GBqPykfxaskasPuqFWSDgAGZtqhMBZiGRIABVDR4ABKtBw1AwBDQdm4ZnkhMk8R6aBwAHc0qo+Op5F48E8dEJMAypCQjERcLcpNy9OLrlIdDgaEclKlVG5dgVICTFeDIXUmaz4XdReK5lKxZNYfLFeKkWAUbAACwYoHdbBoDzDLjmAoGOn4RouKZeoEGfhUdhYANB71eAxaIRCJyRyBql0E-BdN0e0I8TkxnC+wkqSB+vAASR0kgjLAwdlV4C0GAjJfp+MJmas2e4+cL-pTYwF7HYmGppYrtrWMEA+OaAbHNJB33aIAOrugAWFcggFOjQCQ5oBja0Adh6AELdAN4+gGj1QBZ2oBJOWdGoXHhXWHXOk9bkbzdL8HnWeXa43OZ70illGPyzoAC8aAFyekCDsOtYtvg45vlgkDxom2Bfp2P6Pn+3YhncVAJkmwFZGBkHQSOyH4ahWAIdozZhhG6GLg+T6egBCThsmgYgTOEFQWgQ7kfR1E6BO9oAKwYiQNBEEOcBiTSeakFY2gAPxVlgNZ1mYGBEImamQNWI4cpy0o4PpAAi5qqGY-DyHIaAkAZRzmTgBA4EQ8g0FgAAUACUCl5pyj78QAdEpaDaMMUirmgpiBUFMXsCFOmJlFBBUFQcXxeYiUhaZwwYKykCWbgfnGXwap5rZ9mOewRCiAAEmgfmSD0VBoM+ubZcFSUaFgLluR5XllWYeZvqSIV0HY3kAAYACRcD1YUkMpGCBgtS0pTgLgzdcS2mSFdhHAAKkkOB+b5yhjIAcAaAOwWgCR2oAFoqHoA-vKABSu4XaMAW3AKZZhuC4QA

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

type UserEntity = {
    type: 'user'; userId: string;
}
const user: UserEntity = { type: 'user' } // missing userId

/**
 * 期望: EntityWithId 拥有正确的类型定义
 */
type EntityWithId = {}
const user1: EntityWithId = { type: 'user' } // 期望提示 missing userId
const comment: EntityWithId = { type: 'comment' } // 期望提示 missing commentId
const post: EntityWithId = { type: 'post' } // 期望提示 missing postId

/**
 * Q5
 */
class Q5 {
    action?: string;
    name?: string;
    date?: Date;

    public setDefeault() {
        this.action = 'hi';
        this.name = 'foo';
        this.date = new Date();
    }

    public sayHi(): void {
        this.setDefeault();
        console.log(`${this.action} ${this.name}`, this.date.getTime()); // 怎样安全的使用action/name/date
    }
}

```

