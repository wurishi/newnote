# 1. Anaconda 的下载与安装

需要使用大量第三方提供的科学计算类库的 Python 标准安装包, 建议下载安装 Anaconda. [下载地址](https://www.continuum.io/downloads)

## 1.1 验证 Python

```sh
python
>>> print("hello Python")
```

## 1.2 使用 conda 命令

查看已安装的第三方类库:

```sh
conda list
```

安装第三方类库:

```sh
# conda install name
conda install numpy
```

# 2. Python 编译器 PyCharm 的安装

## 2.1 使用 PyCharm 创建程序

helloworld.py

```python
print("hello world")
```

使用菜单 run -> run... 或者直接右击 helloworld.py 后, 选择 run 运行.

## 2.2 使用 Python 计算 softmax 函数

> softmax 用以解决概率计算中概率结果大占绝对优势的问题. 例如, 函数计算结果中, 两个值 a 和 b, 且 a>b , 如果简单地以值的大小为单位衡量的话, 那么在后续的使用过程中, a 永远被选用, 而 b 由于数值较小而不会被选择, 但是有时候也需要数值小的 b 被使用, softmax 就可以解决这个问题.

softmax 按照概率选择 a 和 b, 由于 a 的概率值大于 b, 在计算时 a 经常会被选择, 而 b 由于概率较小, 选择的可能性也较小, 但是也有概率被选择.

```python
import numpy
import math

def softmax(inMatrix):
    m,n = numpy.shape(inMatrix)
    outMatrix = numpy.mat(numpy.zeros((m,n)))
    soft_sum = 0
    for idx in range(0, n):
        outMatrix[0,idx] = math.exp(inMatrix[0,idx])
        soft_sum += outMatrix[0,idx]
    for idx in range(0, n):
        outMatrix[0,idx] = outMatrix[0, idx] / soft_sum
    return outMatrix

a = numpy.array([[1,2,1,2,1,1,3]])
print(softmax(a))
```

## 2.3 Python 常用类库中的 threading

Python 常用类库

| 分类     | 名称          | 用途                                                         |
| -------- | ------------- | ------------------------------------------------------------ |
| 科学计算 | Matplotlib    | 用 Python 实现的类 matlab 的第三方库, 用以绘制一些高质量的数学二维图形 |
|          | SciPy         | 基于 Python 的 matlab 实现, 旨在实现 matlab 的所有功能       |
|          | NumPy         | 基于 Python 的科学计算第三方库, 提供了矩阵, 线性代数, 傅立叶变换等解决方案 |
| GUI      | PyGtk         | 基于 Python 的 GUI 程序开发 GTK+ 库                          |
|          | PyQt          | 用于 Python 的 QT 开发库                                     |
|          | WxPython      | Python 下的 GUI 编程框架, 与 MFC 的架构相似                  |
|          | Tkinter       | Python 下标准的界面编程包, 因此不算是第三方库                |
| 其他     | BeautifulSoup | 基于 Python 的 HTML/XML 解析器, 简单易用                     |
|          | PIL           | 基于 Python 的图像处理库, 功能强大, 对图形文件的格式支持广泛 |
|          | MySQLdb       | 用于连接 MySQL 数据库                                        |
|          | cElementTree  | 高性能 XML 解析库, Py2.5 应该已经包含了该模块, 因此不算 一个第三方库 |
|          | PyGame        | 基于 Python 的多媒体开发和游戏软件开发模块                   |
|          | Py2exe        | 将 Python 脚本转换为 Windows 上可以独立运行的可执行程序      |
|          | pefile        | Windows PE 文件解析器                                        |

### 2.3.1 threading 库的使用

对于希望充分利用计算机性能的程序设计者来说, 多线程的应用是一个必不可少的技能. 多线程类似于使用计算机的一个核心执行多个不同的任务. 多线程的好处如下:

- 使用线程可以把需要使用大量时间的计算任务放到后台去处理.
- 减少资源占用, 加快程序的运行速度.
- 在传统的输入输出以及网络收发等普通操作上, 后台处理可以美化当前界面, 增加界面的人性化.

### 2.3.2 threading 模块中最重要的 Thread 类

```python
import threading, time
count = 0
class MyThread(threading.Thread):
    def __init__(self, threadName):
        super(MyThread, self).__init__(name = threadName)

    def run(self):
        global count
        for i in range(100):
            count = count + 1
            time.sleep(0.3)
            print(self.getName(), count)

for i in range(2):
    MyThread("MyThreadName:" + str(i)).start()
```

在自定义的 MyThread 类中, 重写了从父类继承的 `run`方法, 在 `run`方法中, 将一个全局变量逐一增加.

> 其中的 run 和 start 方法并不是 threading 自带的方法, 而是从 Python 本身的线程处理模块 Thread 中继承来的. run 方法的作用是在线程被启动以后, 执行预先写入的程序代码. 一般而言, run 方法所执行的内容被称为 Activity, 而 start 方法是用于启动线程的方法.

### 2.3.3 threading 中的 Lock 类

Lock 类是 threading 中用于锁定当前线程的锁定类, 顾名思义, 其作用是对当前运行中的线程进行锁定, 只有被当前线程释放后, 后续线程才可以继续操作.

```python
import threading
lock = threading.Lock()
lock.acquire()
lock.release()
```

```python
import threading,time,random

count = 0
class MyThread(threading.Thread):
    def __init__(self, lock, threadName):
        super(MyThread, self).__init__(name = threadName)
        self.lock = lock

    def run(self):
        global count
        self.lock.acquire()
        for i in range(100):
            count = count + 1
            time.sleep(0.3)
            print(self.getName(), count)
        self.lock.release()

lock = threading.Lock()
for i in range(2):
    MyThread(lock, 'MyThreadName:' + str(i)).start()
```

### 2.3.4 threading 中的  join 类

join 类是 threading 中用于堵塞当前主线程的类, 其作用是阻止全部的线程继续运行, 直到被调用的线程执行完毕或超时.

```python
import threading,time
def doWaiting():
    print('start waiting:', time.strftime('%S'))
    time.sleep(3)
    print('stop waiting', time.strftime('%S'))
    thread1 = threading.Thread(target=doWaiting)
    thread1.start()
    time.sleep(1)
    print('start join')
    thread1.join()
    print('end join')

doWaiting()
```

# 3. Python 类库的使用 - 数据处理及可视化展示

## 3.1 NumPy 的初步使用

### 3.1.1 数据的矩阵化

表 3-1

| 价格 (千) | 面积 (平方米) | 卧室 (个) | 地下室 |
| --------- | ------------- | --------- | ------ |
| 200       | 105           | 3         | 无     |
| 165       | 80            | 2         | 无     |
| 184.5     | 120           | 2         | 无     |
| 116       | 70.8          | 1         | 无     |
| 270       | 150           | 4         | 有     |

表 3-1 是数据的一般表示形式, 但是对于数据处理的过程来说, 这是不可辨识的数据, 因此需要对其进行调整.

常用的数据处理表示形式为数据矩阵, 即可以将表 3-1 表示为一个专门的矩阵, 见表 3-2.

| ID   | Price | area | bedroom | basement |
| ---- | ----- | ---- | ------- | -------- |
| 1    | 200   | 105  | 3       | False    |
| 2    | 165   | 80   | 2       | False    |
| 3    | 184.5 | 120  | 2       | False    |
| 4    | 116   | 70.8 | 1       | False    |
| 5    | 270   | 150  | 4       | True     |

### 3.1.2 数据分析

对于数据来说, 在进行数据处理建模之前, 需要对数据进行基本的分析和处理.

需要知道一个数据集数据的多少和每个数据所拥有的属性个数, 对于程序设计人员和科研人员来说, 这些都是简单的事, 但是对于数据处理的模型来说, 是必不可少的内容.

除此之外, 对于数据集来说, 缺失值的处理也是一个非常重要的过程. 最简单的处理方法是对有缺失值的数据进行整体删除. 但是问题在于, 数据处理的数据来自于现实社会, 因此可能数据集中大多数的数据都会有某些特征属性的缺失, 而解决的办法往往是采用均值或者与目标数据近似的数据特征属性替代. 有些情况替代方法可取, 而有些情况下, 替代或者采用均值的办法处理缺失值是不可取的, 因此要根据具体情况具体处理.

```python
import numpy as np
data = np.mat([[1, 200, 105, 3, False], [2, 165, 80, 2, False], [3, 184.5, 120, 2, False], [4, 116, 70.8,1,False], [5, 270, 150, 4, True]])
row = 0
for line in data:
    row += 1
print(row)
print(data.size)
```

第一行引入了 Anaconda 自带的一个数据矩阵化的包. 这个包可以用来存储和处理大型矩阵, 比 Python 自身的嵌套列表 (nested list structure) 结构要高效得多.

`row` 用于计算数据矩阵的行数. `data.size`是计算数据集中全部数据的数据量, 一般为行数*列数.

```python
print(data[0, 3]) // 3.0
print(data[0, 4]) // 0.0
```

