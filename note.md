```js
/*
 * ==================================================================
 * 1/3 Fix `canFillGap` to return expected results:
 * so the test can pass
 */
const bigBrickSize = 5;
const smallBrickSize = 2;
const canFillGap = (smallQuantity, bigQuantity, totalGap) => {
  const maxBigRequired = Math.floor(totalGap / bigBrickSize);
  if (maxBigRequired > bigQuantity) {
    return false;
  }
  const smallRequired = Math.floor(
    (totalGap - maxBigRequired * bigBrickSize) / smallBrickSize
  );
  if (smallRequired > smallQuantity) {
    return false;
  }
  return (
    totalGap === maxBigRequired * bigBrickSize + smallRequired * smallBrickSize
  );
};

test("canFillGap fills the gap", () => {
  expect(canFillGap(3, 1, 9)).toBeTruthy();
  expect(canFillGap(3, 1, 8)).toBeFalsy();
  expect(canFillGap(3, 2, 10)).toBeTruthy();
  expect(canFillGap(3, 2, 12)).toBeTruthy();
  expect(canFillGap(3, 2, 20)).toBeFalsy();
});

/*
 * ==================================================================
 * 2/3 Try to write the code:
 * Business logic: Given a non-empty array, return true if there is a place to
 * split the array so that the sum of the numbers on one side is equal to the
 * sum of the other side.
 */
const canBalance = (array) => {
  const sum = array.reduce((a, b) => a + b, 0);
  if (sum % 2 !== 0) return false;
  const half = sum / 2;
  let left = 0;
  for (let i = 0, len = array.length; i < len; i++) {
    left += array[i];
    if (left === half) return true;
    else if (left > half) return false;
  }
  return false;
};

test("canBalance finds the balance point", () => {
  expect(canBalance([1, 1, 1, 2, 1])).toBeTruthy();
  expect(canBalance([5, 1, 1, 2, 1])).toBeTruthy();
  expect(canBalance([2, 1, 1, 2, 1])).toBeFalsy();
  expect(canBalance([10, 10])).toBeTruthy();
});

/*
 * ==================================================================
 * 3/3 Try to write the code:
 * Sort the number-like list.
 */
const sortList = (array) => {
  /* 
  sObj: {
    v: number | array,
    min: number,
    max: number,
  }
  */
  const tmpArray = array.map((v) => {
    if (Array.isArray(v)) {
      const vArr = v.concat().sort((a, b) => a - b);
      return {
        v: vArr,
        min: vArr[0],
        max: vArr[vArr.length - 1]
      };
    }
    return { v, min: v, max: v };
  });
  tmpArray.sort((sObj1, sObj2) => {
    if (sObj1.min === sObj2.min) {
      return sObj1.max - sObj2.max;
    }
    return sObj1.min - sObj2.min;
  });
  return tmpArray.map((sObj) => sObj.v);
};

test("sortList sorts number like elements", () => {
  expect(sortList([5, 3, 2, 4, 1])).toEqual([1, 2, 3, 4, 5]);
  expect(sortList([5, [3], [2], 4, 1])).toEqual([1, [2], [3], 4, 5]);
  expect(sortList([5, [3, 2], 4, 1])).toEqual([1, [2, 3], 4, 5]);
  expect(sortList([5, [7, 2], [2, 5], 1])).toEqual([1, [2, 5], [2, 7], 5]);
});

```

```scss
/*
 * ==================================================================
 * 1/2 Draw a ladder(not stairs).
 */
 .ladder {
   li {
     width: 30px;
     border: 1px solid black;
      &:first-child {
        border-top: none;
      }
      &:last-child {
        border-bottom: none;
      }
   }
   
   
}


/*
 * ==================================================================
 * 2/2 Implement a button style with press, hover, active and disable states:
 * press: left clicked on this button
 * hover: mouse pointer hovers over this button
 * active: left clicked on this button and the button remains the state
 *         even after the mouse left the button
 * disable: the button doesn't change despite clicked or hovered over
 * * pure css only *
 */
 .button {
  background: #0977d0;
  color: #fff;
}
.button:hover {
  opacity: 0.7;
}
.button:active:focus {
  color: green;
}
.button:disabled {
  background: grey;
}
.button:disabled:hover {
  opacity: 1;
}

```

共享提交tag

git push origin --tags

# Unity 打包 Android 如果卡在 gradle 阶段。

## 方法一

可以尝试修改 Unity 安装目录(如：Unitys\2019.2.0f1\Editor\Data\PlaybackEngines\AndroidPlayer\Tools\GradleTemplates)下的所有有repositories语句的文件，增加阿里提供的仓库地址：

```
maven{ url 'http://maven.aliyun.com/nexus/content/groups/public/'}
```

类似如下：

```
    repositories {**ARTIFACTORYREPOSITORY**
        maven{ url 'http://maven.aliyun.com/nexus/content/groups/public/'}
        google()
        jcenter()
    }
```

## 方法二

下载好的gradle插件会存储在 **C:\Users\Administrator\.gradle\wrapper\dists**， 可以尝试指定 gradle 版本。（可以先在 gradle 官网下载好对应版本）

```
dependencies {
	classpath 'com.android.tools.build:gradle:3.3.0'
}
```

# 2D 灯光

1. 在 Window / Package Manager 中找到 Lightweight RP 包并安装。
2. 在 Project 中找一个目录创建 Rendering -> Universal Render Pipeline -> Pipeline Asset 和 2D Renderer。
3. 选择之前创建的 Pipeline Asset ，在 Inspector 窗口中的 General 选项里面为 Renderer List 里面的第一项指定一个 ScriptableRendererData (就是指向上面创建的 2D Renderer)。
4. 在 Edit / Project Settings 中找到 Graphics 面板，指定 Scriptable Render Pipeline Settings 为第2步创建的 Pipeline Asset。
5. 所有场景中的 Renderer 的 Material 应该全部指向 Sprite-Lit-Default。可以通过菜单 Edit / Render Pipeline / Universal Render Pipeline / 2D Renderer 下批量修改。
6. 接下来可能通过创建 Light -> 2D 创建 2D 灯光。
7. 除了 Global Light 外，其他灯光都可以使用法线贴图，通过 Inspector 窗口勾选上 Use Normal Map。
8. 然后用 Sprite Editor 修改贴图，左上角菜单选择 Secondary Textures，添加一张法线帖图，Name 必须为 _NormalMap（可以通过下拉列表选择）。

# 法线贴图的生成

## 方法一

使用 SpriteIlluminator 类工具生成。

## 方法二

Ctrl + D 复制一张 Texture，在 Inspector 窗口中选择 Texture Type 为 Normal map。另外可以勾选上 Create from Grayscale，调整法线。