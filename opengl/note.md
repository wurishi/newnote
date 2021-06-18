*NeHe OpenGL教程（中英文版附带VC++源码）中英文系列
**

# Link

Lesson 01-lesson 02
创建一个OpenGL窗口:
如何创建三角形和四边形
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53679

 

Lesson 03-lesson 04
添加颜色
旋转
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53682

Lesson 05-lesson 06
3D空间
纹理映射
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53706

Lesson 07-lesson 08
光照和键盘控制
混合
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53709

Lesson 09-lesson 10
3D空间中移动图像
加载3D世界，并在其中漫游
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53822

Lesson 11-lesson 12
飘动的旗帜
显示列表
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53823

Lesson 13-lesson 14

 

 

http://www.ieee.org.cn/dispbbs.asp?boardID=61&ID=54065


图像字体
图形字体
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53880

Lesson 15-lesson 16
图形字体的纹理映射
雾
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=53881

Lesson 17-lesson 18
2D 图像文字
二次几何体
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54042

Lesson 19-lesson 20
粒子系统
蒙板
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54072

Lesson 21-lesson 22
线，反走样，计时，正投影和简单的声音
凹凸映射，多重纹理扩展
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54074

Lesson 23-lesson 24
球面映射
扩展，剪裁和TGA图像文件的加载
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54176

Lesson 25-lesson 26
变形和从文件中加载3D物体
剪裁平面，蒙板缓存和反射
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54177

Lesson 27-lesson 28
影子
贝塞尔曲面
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54180

Lesson 29-lesson 30
Blitter 函数
碰撞检测
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54186

Lesson 31-lesson 32
模型加载
拾取, Alpha混合, Alpha测试, 排序
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54209

Lesson 33-lesson 34
加载压缩和未压缩的TGA文件
从高度图生成地形
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54271

Lesson 35-lesson 36
在OpenGL中播放AVI
放射模糊和渲染到纹理
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54289

Lesson 37-lesson 38
卡通映射
从资源文件中载入图像
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54290

Lesson 39-lesson 40
物理模拟简介
绳子的模拟
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54706

Lesson 41-lesson 42
体积雾气
多重视口
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54707

Lesson 43-lesson 44
在OpenGL中使用FreeType库
3D 光晕
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54710

Lesson 45-lesson 46
顶点缓存
全屏反走样
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54729

Lesson 47-lesson 48
CG 顶点脚本
轨迹球实现的鼠标旋转
http://ieee.org.cn/dispbbs.asp?boardID=61&ID=54730

# 第一课 创建一个OpenGL窗口

在这个教程里,我将教你在Windows环境中创建OpenGL程序.它将显示一个空的OpenGL窗口,可以在窗口和全屏模式下切换,按ESC退出.它是我们以后应用程序的框架.

理解OpenGL如何工作非常重要，你可以在教程的末尾下载源程序，但我强烈建议你至少读一遍教程，然后再开始编程.

欢迎来到我的 OpenGL教程。我是个对 OpenGL充满激情的普通男孩！ 我第一次听说 OpenGL是 3Dfx 发布 Voodoo1 卡的 OpenGL硬件加速驱动的时候。我立刻意识到 OpenGL是那种必须学习的东西。不幸的是当时很难从书本或网络上找到关于 OpenGL的讯息。我花了 N 个 小时来调试自己书写的代码，甚至在 IRC和 EMail 上花更多的时间来恳求别人帮忙。但我发现那 些懂得 OpenGL 高手们保留了他们的精华，对共享知识也不感兴趣。实在让人灰心 !
我创建这个网站的目的是为了帮助那些对 OpenGL有兴趣却又需要帮助的人。在我的每个教程中，我都会尽可能详细的来解释每一行代码的作用。我会努力让我的代码更简单（您无需学习 MFC代码）！就算您是个VC 、OPENGL的绝对新手也应该可以读通代码，并清楚的知道发生了什么。我的站点只是许多提供 OpenGL教程的站点中的一个。如果您是 OpenGL的高级程序员的话，我的站点可能太简单了，但如果您才开始的话，我想这个站点会教会您许多东西！
教程的这一节在2000年一月彻底重写了一遍。将会教您如何设置一个 OpenGL窗口。它可以只是一个窗口或是全屏幕的、可以任意 大小、任意色彩深度。此处的代码很稳定且很强大，您可以在您所有的OpenGL项目中使用。我所有的教程都将基于此节的代码！所有的错误都有被报告。所以应该没有内存泄漏，代码也很容易阅读和修改。感谢Fredric Echols对代码所做的修改！

现在就让我们直接从代码开始吧。第一件事是打开VC然后创建一个新工程。如果您不知道如何创建的话，您也许不该学习OpenGL，而应该先学学VC。某些版本的VC需要将 bool 改成 BOOL , true 改成 TRUE , false 改成 FALSE ，请自行修改。

在您创建一个新的Win32程序（不是console控制台程序）后，您还需要链接OpenGL库文件。在VC中操作如下：Project-> Settings,然后单击LINK标签。在"Object/Library Modules"选项中的开始处（在 kernel32.lib 前）增加 OpenGL32.lib GLu32.lib 和 GLaux.lib 后单击OK按钮。现在可以开始写您的OpenGL程序了。

代码的前4行包括了我们使用的每个库文件的头文件。如下所示：

```c
#include <windows.h> // Windows的头文件
#include <glew.h> // 包含最新的gl.h,glu.h库
#include <glut.h> // 包含OpenGL实用库
```

接下来您需要设置您计划在您的程序中使用的所有变量。本节中的例程将创建一个空的OpenGL窗口，因此我们暂时还无需设置大堆的变量。余下需要设置的变量不多，但十分重要。您将会在您以后所写的每一个OpenGL程序中用到它们。
第一行设置的变量是Rendering Context(着色描述表)。每一个OpenGL都被连接到一个着色描述表上。着色描述表将所有的OpenGL调用命令连接到Device Context(设备描述表)上。我将OpenGL的着色描述表定义为 hRC 。要让您的程序能够绘制窗口的话，还需要创建一个设备描述表，也就是第二行的内容。Windows的设备描述表被定义为 hDC 。DC将窗口连接到GDI(Graphics Device Interface图形设备接口)。而RC将OpenGL连接到DC。第三行的变量 hWnd 将保存由Windows给我们的窗口指派的句柄。最后，第四行为我们的程序创建了一个Instance(实例)。

```c
HGLRC hRC=NULL;    // 窗口着色描述表句柄
HDC hDC=NULL;    // OpenGL渲染描述表句柄
HWND hWnd=NULL;    // 保存我们的窗口句柄
HINSTANCE hInstance;    // 保存程序的实例
```

接下来您需要设置您计划在您的程序中使用的所有变量。本节中的例程将创建一个空的OpenGL窗口，因此我们暂时还无需设置大堆的变量。余下需要设置的变量不多，但十分重要。您将会在您以后所写的每一个OpenGL程序中用到它们。
第一行设置的变量是Rendering Context(着色描述表)。每一个OpenGL都被连接到一个着色描述表上。着色描述表将所有的OpenGL调用命令连接到Device Context(设备描述表)上。我将OpenGL的着色描述表定义为 hRC 。要让您的程序能够绘制窗口的话，还需要创建一个设备描述表，也就是第二行的内容。Windows的设备描述表被定义为 hDC 。DC将窗口连接到GDI(Graphics Device Interface图形设备接口)。而RC将OpenGL连接到DC。第三行的变量 hWnd 将保存由Windows给我们的窗口指派的句柄。最后，第四行为我们的程序创建了一个Instance(实例)。
HGLRC      hRC=NULL;    // 窗口着色描述表句柄
HDC       hDC=NULL;    // OpenGL渲染描述表句柄
HWND      hWnd=NULL;    // 保存我们的窗口句柄
HINSTANCE    hInstance;    // 保存程序的实例

下面的第一行设置一个用来监控键盘动作的数组。有许多方法可以监控键盘的动作，但这里的方法很可靠，并且可以处理多个键同时按下的情况。
active 变量用来告知程序窗口是否处于最小化的状态。如果窗口已经最小化的话，我们可以做从暂停代码执行到退出程序的任何事情。我喜欢暂停程序。这样可以使得程序不用在后台保持运行。
fullscreen 变量的作用相当明显。如果我们的程序在全屏状态下运行， fullscreen 的值为TRUE，否则为FALSE。这个全局变量的设置十分重要，它让每个过程都知道程序是否运行在全屏状态下。

```c
bool keys[256];    // 保存键盘按键的数组
bool active=TRUE;    // 窗口的活动标志，缺省为TRUE
bool fullscreen=TRUE;    // 全屏标志缺省，缺省设定成全屏模式
```

现在我们需要先定义WndProc()。必须这么做的原因是CreateGLWindow()有对WndProc()的引用，但WndProc()在CreateGLWindow()之后才出现。在C语言中，如果我们想要访问一个当前程序段之后的过程和程序段的话，必须在程序开始处先申明所要访问的程序段。所以下面的一行代码先行定义了WndProc()，使得CreateGLWindow()能够引用WndProc()。

```c
LRESULT CALLBACK WndProc(HWND, UINT, WPARAM, LPARAM);  // WndProc的定义
```

下面的代码的作用是重新设置OpenGL场景的大小，而不管窗口的大小是否已经改变(假定您没有使用全屏模式)。甚至您无法改变窗口的大小时(例如您在全屏模式下)，它至少仍将运行一次--在程序开始时设置我们的透视图。OpenGL场景的尺寸将被设置成它显示时所在窗口的大小。

```c
GLvoid ReSizeGLScene(GLsizei width, GLsizei height)  // 重置OpenGL窗口大小
{
    if (height == 0) // 防止被零除
    {
        height=1;    // 将Height设为1
    }
    glViewport(0, 0, width, height);   // 重置当前的视口
```

下面几行为透视图设置屏幕。意味着越远的东西看起来越小。这么做创建了一个现实外观的场景。此处透视按照基于窗口宽度和高度的45度视角来计算。0.1f，100.0f是我们在场景中所能绘制深度的起点和终点。
glMatrixMode(GL_PROJECTION)指明接下来的两行代码将影响projection matrix(投影矩阵)。投影矩阵负责为我们的场景增加透视。 glLoadIdentity()近似于重置。它将所选的矩阵状态恢复成其原始状态。调用 glLoadIdentity()之后我们为场景设置透视图。
glMatrixMode(GL_MODELVIEW)指明任何新的变换将会影响 modelview matrix(模型观察矩阵)。模型观察矩阵中存放了我们的物体讯息。最后我们重置模型观察矩阵。如果您还不能理解这些术语的含义，请别着急。在以后的教程里，我会向大家解释。只要知道如果您想获得一个精彩的透视场景的话，必须这么做。

```c
    glMatrixMode(GL_PROJECTION);   // 选择投影矩阵
    glLoadIdentity();    // 重置投影矩阵

    // 设置视口的大小
    gluPerspective(45.0f,(GLfloat)width/(GLfloat)height,0.1f,100.0f);

    glMatrixMode(GL_MODELVIEW);   // 选择模型观察矩阵
    glLoadIdentity();    // 重置模型观察矩阵
}
```

接下的代码段中，我们将对OpenGL进行所有的设置。我们将设置清除屏幕所用的颜色，打开深度缓存，启用smooth shading(阴影平滑)，等等。这个例程直到OpenGL窗口创建之后才会被调用。此过程将有返回值。但我们此处的初始化没那么复杂，现在还用不着担心这个返回值。

```c
int InitGL(GLvoid)    // 此处开始对OpenGL进行所有设置
{
```

下一行启用smooth shading(阴影平滑)。阴影平滑通过多边形精细的混合色彩，并对外部光进行平滑。我将在另一个教程中更详细的解释阴影平滑。

```c
	glShadeModel(GL_SMOOTH);   // 启用阴影平滑
```

下一行设置清除屏幕时所用的颜色。如果您对色彩的工作原理不清楚的话，我快速解释一下。色彩值的范围从0.0f到1.0f。0.0f代表最黑的情况，1.0f就是最亮的情况。glClearColor 后的第一个参数是Red Intensity(红色分量),第二个是绿色，第三个是蓝色。最大值也是1.0f，代表特定颜色分量的最亮情况。最后一个参数是Alpha值。当它用来清除屏幕的时候，我们不用关心第四个数字。现在让它为0.0f。我会用另一个教程来解释这个参数。
通过混合三种原色(红、绿、蓝)，您可以得到不同的色彩。希望您在学校里学过这些。因此，当您使用glClearColor(0.0f,0.0f,1.0f,0.0f)，您将用亮蓝色来清除屏幕。如果您用 glClearColor(0.5f,0.0f,0.0f,0.0f)的话，您将使用中红色来清除屏幕。不是最亮(1.0f)，也不是最暗 (0.0f)。要得到白色背景，您应该将所有的颜色设成最亮(1.0f)。要黑色背景的话，您该将所有的颜色设为最暗(0.0f)。

```c
	glClearColor(0.0f, 0.0f, 0.0f, 0.0f);   // 黑色背景
```

接下来的三行必须做的是关于depth buffer(深度缓存)的。将深度缓存设想为屏幕后面的层。深度缓存不断的对物体进入屏幕内部有多深进行跟踪。我们本节的程序其实没有真正使用深度缓存，但几乎所有在屏幕上显示3D场景OpenGL程序都使用深度缓存。它的排序决定那个物体先画。这样您就不会将一个圆形后面的正方形画到圆形上来。深度缓存是OpenGL十分重要的部分。

```c
    glClearDepth(1.0f);    // 设置深度缓存
    glEnable(GL_DEPTH_TEST);   // 启用深度测试
    glDepthFunc(GL_LEQUAL);    // 所作深度测试的类型
```

接着告诉OpenGL我们希望进行最好的透视修正。这会十分轻微的影响性能。但使得透视图看起来好一点。

```c
	glHint(GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);  // 告诉系统对透视进行修正
```

最后，我们返回TRUE。如果我们希望检查初始化是否OK，我们可以查看返回的 TRUE或FALSE的值。如果有错误发生的话，您可以加上您自己的代码返回FALSE。目前，我们不管它。

```c
	return TRUE;    // 初始化 OK
}
```

下一段包括了所有的绘图代码。任何您所想在屏幕上显示的东东都将在此段代码中出现。以后的每个教程中我都会在例程的此处增加新的代码。如果您对OpenGL已经有所了解的话，您可以在 glLoadIdentity()调用之后，返回TRUE值之前，试着添加一些OpenGL代码来创建基本的形。如果您是OpenGL新手，等着我的下个教程。目前我们所作的全部就是将屏幕清除成我们前面所决定的颜色，清除深度缓存并且重置场景。我们仍没有绘制任何东东。
返回TRUE值告知我们的程序没有出现问题。如果您希望程序因为某些原因而中止运行，在返回TRUE值之前增加返回FALSE的代码告知我们的程序绘图代码出错。程序即将退出。

```c
int DrawGLScene(GLvoid)    // 从这里开始进行所有的绘制
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);  // 清除屏幕和深度缓存
    glLoadIdentity();    // 重置当前的模型观察矩阵
    return TRUE;    // 一切 OK
}
```

下一段代码只在程序退出之前调用。KillGLWindow() 的作用是依次释放着色描述表，设备描述表和窗口句柄。我已经加入了许多错误检查。如果程序无法销毁窗口的任意部分，都会弹出带相应错误消息的讯息窗口，告诉您什么出错了。使您在您的代码中查错变得更容易些。

```c
GLvoid KillGLWindow(GLvoid)    // 正常销毁窗口
{
```

我们在KillGLWindow()中所作的第一件事是检查我们是否处于全屏模式。如果是，我们要切换回桌面。我们本应在禁用全屏模式前先销毁窗口，但在某些显卡上这么做可能会使得桌面崩溃。所以我们还是先禁用全屏模式。这将防止桌面出现崩溃，并在Nvidia和3dfx显卡上都工作的很好！

```c
    if (fullscreen)    // 我们处于全屏模式吗?
    {
```

我们使用ChangeDisplaySettings(NULL,0)回到原始桌面。将NULL作为第一个参数，0作为第二个参数传递强制Windows使用当前存放在注册表中的值(缺省的分辨率、色彩深度、刷新频率，等等)来有效的恢复我们的原始桌面。切换回桌面后，我们还要使得鼠标指针重新可见。

```c
        ChangeDisplaySettings(NULL,0);   // 是的话，切换回桌面
        ShowCursor(TRUE);   // 显示鼠标指针
    }
```

接下来的代码查看我们是否拥有着色描述表(hRC)。如果没有，程序将跳转至后面的代码查看是否拥有设备描述表。

```c 
    if (hRC)    // 我们拥有OpenGL渲染描述表吗?
    {
```

如果存在着色描述表的话，下面的代码将查看我们能否释放它(将 hRC从hDC分开)。这里请注意我使用的的查错方法。基本上我只是让程序尝试释放着色描述表(通过调用wglMakeCurrent(NULL,NULL)，然后我再查看释放是否成功。巧妙的将数行代码结合到了一行。

```c
        if (!wglMakeCurrent(NULL,NULL))   // 我们能否释放DC和RC描述表?
        {
```

如果不能释放DC和RC描述表的话，MessageBox()将弹出错误消息，告知我们DC和RC无法被释放。NULL意味着消息窗口没有父窗口。其右的文字将在消息窗口上出现。"SHUTDOWN ERROR"出现在窗口的标题栏上。MB_OK的意思消息窗口上带有一个写着OK字样的按钮。
MB_ICONINFORMATION将在消息窗口中显示一个带圈的小写的i(看上去更正式一些)。 

```c
        	MessageBox(NULL,"释放DC或RC失败。","关闭错误",MB_OK | MB_ICONINFORMATION);
        }
```

下一步我们试着删除着色描述表。如果不成功的话弹出错误消息。 

```c
        if (!wglDeleteContext(hRC))   // 我们能否删除RC?
        {
```

如果无法删除着色描述表的话，将弹出错误消息告知我们RC未能成功删除。然后hRC被设为NULL。

```c
			MessageBox(NULL,"释放RC失败。","关闭错误",MB_OK | MB_ICONINFORMATION);
		}
		hRC=NULL;    // 将RC设为 NULL
	}
```

现在我们查看是否存在设备描述表，如果有尝试释放它。如果不能释放设备描述表将弹出错误消息，然后hDC设为NULL。

```c
    if (hDC && !ReleaseDC(hWnd,hDC))   // 我们能否释放 DC?
    {
        MessageBox(NULL,"释放DC失败。","关闭错误",MB_OK | MB_ICONINFORMATION);
        hDC=NULL;    // 将 DC 设为 NULL
    }
```

现在我们来查看是否存在窗口句柄，我们调用 DestroyWindow( hWnd )来尝试销毁窗口。如果不能的话弹出错误窗口，然后hWnd被设为NULL。

```c
    if (hWnd && !DestroyWindow(hWnd))   // 能否销毁窗口?
    {
        MessageBox(NULL,"释放窗口句柄失败。","关闭错误",MB_OK | MB_ICONINFORMATION);
        hWnd=NULL;    // 将 hWnd 设为 NULL
    }
```

最后要做的事是注销我们的窗口类。这允许我们正常销毁窗口，接着在打开其他窗口时，不会收到诸如"Windows Class already registered"(窗口类已注册)的错误消息。

```c
    if (!UnregisterClass("OpenG",hInstance))  // 能否注销类?
    {
        MessageBox(NULL,"不能注销窗口类。","关闭错误",MB_OK | MB_ICONINFORMATION);
        hInstance=NULL;    // 将 hInstance 设为 NULL
    }
}
```

接下来的代码段创建我们的OpenGL窗口。我花了很多时间来做决定是否创建固定的全屏模式这样不需要许多额外的代码，还是创建一个容易定制的友好的窗口但需要更多的代码。当然最后我选择了后者。我经常在EMail中收到诸如此类的问题：怎样创建窗口而不使用全屏幕?怎样改变窗口的标题栏?怎样改变窗口的分辨率或pixel format(象素格式)?以下的代码完成了所有这一切！尽管最好要学学材质，这会让您写自己的OpenGL程序变得容易的多！
正如您所见，此过程返回布尔变量(TRUE 或 FALSE)。他还带有5个参数：窗口的标题栏，窗口的宽度，窗口的高度，色彩位数(16/24/32)，和全屏标志(TRUE --全屏模式， FALSE--窗口模式 )。返回的布尔值告诉我们窗口是否成功创建。

```c
BOOL CreateGLWindow(char* title, int width, int height, int bits, bool fullscreenflag)
{
```

当我们要求Windows为我们寻找相匹配的象素格式时，Windows寻找结束后将模式值保存在变量PixelFormat中。

```c
	GLuint PixelFormat;   // 保存查找匹配的结果
```

wc用来保存我们的窗口类的结构。窗口类结构中保存着我们的窗口信息。通过改变类的不同字段我们可以改变窗口的外观和行为。每个窗口都属于一个窗口类。当您创建窗口时，您必须为窗口注册类。

```c
	WNDCLASS wc;    // 窗口类结构
```

dwExStyle和dwStyle存放扩展和通常的窗口风格信息。我使用变量来存放风格的目的是为了能够根据我需要创建的窗口类型(是全屏幕下的弹出窗口还是窗口模式下的带边框的普通窗口)；来改变窗口的风格。

```c
    DWORD dwExStyle;   // 扩展窗口风格
    DWORD dwStyle;   // 窗口风格
```

下面的5行代码取得矩形的左上角和右下角的坐标值。我们将使用这些值来调整我们的窗口使得其上的绘图区的大小恰好是我们所需的分辨率的值。通常如果我们创建一个640x480的窗口，窗口的边框会占掉一些分辨率的值。

```c
    RECT WindowRect;    // 取得矩形的左上角和右下角的坐标值
    WindowRect.left=(long)0;   // 将Left  设为 0
    WindowRect.right=(long)width;   // 将Right 设为要求的宽度
    WindowRect.top=(long)0;    // 将Top  设为 0
    WindowRect.bottom=(long)height;   // 将Bottom 设为要求的高度
```

下一行代码我们让全局变量fullscreen等于fullscreenflag。如果我们希望在全屏幕下运行而将fullscreenflag设为TRUE，但没有让变量fullscreen等于fullscreenflag的话，fullscreen变量将保持为FALSE。当我们在全屏幕模式下销毁窗口的时候，变量fullscreen的值却不是正确的TRUE值，计算机将误以为已经处于桌面模式而无法切换回桌面。上帝啊，但愿这一切都有意义。就是一句话，fullscreen的值必须永远fullscreenflag的值，否则就会有问题。 

```c
	fullscreen=fullscreenflag;   // 设置全局全屏标志
```

下一部分的代码中，我们取得窗口的实例，然后定义窗口类。
CS_HREDRAW 和 CS_VREDRAW 的意思是无论何时，只要窗口发生变化时就强制重画。CS_OWNDC为窗口创建一个私有的DC。这意味着DC不能在程序间共享。WndProc是我们程序的消息处理过程。由于没有使用额外的窗口数据，后两个字段设为零。然后设置实例。接着我们将hIcon设为NULL，因为我们不想给窗口来个图标。鼠标指针设为标准的箭头。背景色无所谓(我们在GL中设置)。我们也不想要窗口菜单，所以将其设为NULL。类的名字可以您想要的任何名字。出于简单，我将使用"OpenG"。

 

```c
    hInstance = GetModuleHandle(NULL);  // 取得我们窗口的实例
    wc.style = CS_HREDRAW | CS_VREDRAW | CS_OWNDC; // 移动时重画，并为窗口取得DC
    wc.lpfnWndProc = (WNDPROC) WndProc;  // WndProc处理消息
    wc.cbClsExtra = 0;   // 无额外窗口数据
    wc.cbWndExtra = 0;   // 无额外窗口数据
    wc.hInstance = hInstance;   // 设置实例
    wc.hIcon = LoadIcon(NULL, IDI_WINLOGO);  // 装入缺省图标
    wc.hCursor = LoadCursor(NULL, IDC_ARROW);  // 装入鼠标指针
    wc.hbrBackground = NULL;   // GL不需要背景
    wc.lpszMenuName = NULL;   // 不需要菜单
    wc.lpszClassName = "OpenG";   // 设定类名字
```

现在注册类名字。如果有错误发生，弹出错误消息窗口。按下上面的OK按钮后，程序退出

```c
    if (!RegisterClass(&wc))   // 尝试注册窗口类
    {
        MessageBox(NULL,"注册窗口失败","错误",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 退出并返回FALSE
    }
```

查看程序应该在全屏模式还是窗口模式下运行。如果应该是全屏模式的话，我们将尝试设置全屏模式。

```c
    if (fullscreen)    // 要尝试全屏模式吗?
    {
```

下一部分的代码看来很多人都会有问题要问关于.......切换到全屏模式。在切换到全屏模式时，有几件十分重要的事您必须牢记。必须确保您在全屏模式下所用的宽度和高度等同于窗口模式下的宽度和高度。最最重要的是要在创建窗口之前设置全屏模式。这里的代码中，您无需再担心宽度和高度，它们已被设置成与显示模式所对应的大小。

```c
        DEVMODE dmScreenSettings;   // 设备模式
        memset(&dmScreenSettings,0,sizeof(dmScreenSettings));  // 确保内存清空为零
        dmScreenSettings.dmSize=sizeof(dmScreenSettings);  // Devmode 结构的大小
        dmScreenSettings.dmPelsWidth = width;  // 所选屏幕宽度
        dmScreenSettings.dmPelsHeight = height;  // 所选屏幕高度
        dmScreenSettings.dmBitsPerPel = bits;   // 每象素所选的色彩深度
        dmScreenSettings.dmFields=DM_BITSPERPEL|DM_PELSWIDTH|DM_PELSHEIGHT;
```

上面的代码中，我们分配了用于存储视频设置的空间。设定了屏幕的宽，高，色彩深度。下面的代码我们尝试设置全屏模式。我们在dmScreenSettings中保存了所有的宽，高，色彩深度讯息。下一行使用ChangeDisplaySettings来尝试切换成与dmScreenSettings所匹配模式。我使用参数CDS_FULLSCREEN来切换显示模式，因为这样做不仅移去了屏幕底部的状态条，而且它在来回切换时，没有移动或改变您在桌面上的窗口。

```c
        // 尝试设置显示模式并返回结果。注: CDS_FULLSCREEN 移去了状态条。
        if (ChangeDisplaySettings(&dmScreenSettings,CDS_FULLSCREEN)!=DISP_CHANGE_SUCCESSFUL)
        {
```

如果模式未能设置成功，我们将进入以下的代码。如果不能匹配全屏模式，弹出消息窗口，提供两个选项：在窗口模式下运行或退出。

```c
            // 若模式失败，提供两个选项：退出或在窗口内运行。
            if (MessageBox(NULL,"全屏模式在当前显卡上设置失败！\n使用窗口模式？","NeHe G",MB_YESNO|MB_ICONEXCLAMATION)==IDYES)
            {
```

如果用户选择窗口模式，变量fullscreen 的值变为FALSE,程序继续运行。

```c
            	fullscreen=FALSE;  // 选择窗口模式(Fullscreen=FALSE)
            }
            else
            {
```

如果用户选择退出，弹出消息窗口告知用户程序将结束。并返回FALSE告诉程序窗口未能成功创建。程序退出。

```c
                // 弹出一个对话框，告诉用户程序结束
                MessageBox(NULL,"程序将被关闭","错误",MB_OK|MB_ICONSTOP);
                return FALSE;   // 退出并返回 FALSE
            }
		}
	}
```

由于全屏模式可能失败，用户可能决定在窗口下运行，我们需要在设置屏幕/窗口之前，再次检查fullscreen的值是TRUE或FALSE。

```c
    if (fullscreen)    // 仍处于全屏模式吗?
    {
```

如果我们仍处于全屏模式，设置扩展窗体风格为WS_EX_APPWINDOW，这将强制我们的窗体可见时处于最前面。再将窗体的风格设为WS_POPUP。这个类型的窗体没有边框，使我们的全屏模式得以完美显示。
最后我们禁用鼠标指针。当您的程序不是交互式的时候，在全屏模式下禁用鼠标指针通常是个好主意。

```c
        dwExStyle=WS_EX_APPWINDOW;   // 扩展窗体风格
        dwStyle=WS_POPUP;   // 窗体风格
        ShowCursor(FALSE);   // 隐藏鼠标指针
    }
    else
    {
```

如果我们使用窗口而不是全屏模式，我们在扩展窗体风格中增加了 WS_EX_WINDOWEDGE，增强窗体的3D感观。窗体风格改用 WS_OVERLAPPEDWINDOW，创建一个带标题栏、可变大小的边框、菜单和最大化/最小化按钮的窗体。

```c
        dwExStyle=WS_EX_APPWINDOW | WS_EX_WINDOWEDGE;  // 扩展窗体风格
        dwStyle=WS_OVERLAPPEDWINDOW;   // 窗体风格
    }
```

下一行代码根据创建的窗体类型调整窗口。调整的目的是使得窗口大小正好等于我们要求的分辨率。通常边框会占用窗口的一部分。使用AdjustWindowRectEx 后，我们的OpenGL场景就不会被边框盖住。实际上窗口变得更大以便绘制边框。全屏模式下，此命令无效。

```c
    AdjustWindowRectEx(&WindowRect, dwStyle, FALSE, dwExStyle); // 调整窗口达到真正要求的大小
```

下一段代码开始创建窗口并检查窗口是否成功创建。我们将传递CreateWindowEx()所需的所有参数。如扩展风格、类名字(与您在注册窗口类时所用的名字相同)、窗口标题、窗体风格、窗体的左上角坐标(0,0 是个安全的选择)、窗体的宽和高。我们没有父窗口，也不想要菜单，这些参数被设为NULL。还传递了窗口的实例，最后一个参数被设为NULL。
注意我们在窗体风格中包括了 WS_CLIPSIBLINGS 和 WS_CLIPCHILDREN。要让OpenGL正常运行，这两个属性是必须的。他们阻止别的窗体在我们的窗体内/上绘图。

```c
    if (!(hWnd=CreateWindowEx( dwExStyle,  // 扩展窗体风格
                              "OpenG",  // 类名字
                              title,   // 窗口标题
                              WS_CLIPSIBLINGS |  // 必须的窗体风格属性
                              WS_CLIPCHILDREN |  // 必须的窗体风格属性
                              dwStyle,  // 选择的窗体属性
                              0, 0,   // 窗口位置
                              WindowRect.right-WindowRect.left, // 计算调整好的窗口宽度
                              WindowRect.bottom-WindowRect.top, // 计算调整好的窗口高度
                              NULL,   // 无父窗口
                              NULL,   // 无菜单
                              hInstance,  // 实例
                              NULL)))   // 不向WM_CREATE传递任何东东
```

下来我们检查看窗口是否正常创建。如果成功， hWnd保存窗口的句柄。如果失败，弹出消息窗口，并退出程序。

```c
    {
        KillGLWindow();    // 重置显示区
        MessageBox(NULL,"不能创建一个窗口设备描述表","错误",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 返回 FALSE
    }
```

下面的代码描述象素格式。我们选择了通过RGBA(红、绿、蓝、alpha通道)支持OpenGL和双缓存的格式。我们试图找到匹配我们选定的色彩深度(16位、24位、32位)的象素格式。最后设置16位Z-缓存。其余的参数要么未使用要么不重要(stencil buffer模板缓存和accumulation buffer聚集缓存除外)。

```c
    static PIXELFORMATDESCRIPTOR pfd=   // /pfd 告诉窗口我们所希望的东东，即窗口使用的像素格式
    {
        sizeof(PIXELFORMATDESCRIPTOR),   // 上述格式描述符的大小
        1,    // 版本号
        PFD_DRAW_TO_WINDOW |   // 格式支持窗口
            PFD_SUPPORT_OPENGL |   // 格式必须支持OpenGL
            PFD_DOUBLEBUFFER,   // 必须支持双缓冲
        PFD_TYPE_RGBA,    // 申请 RGBA 格式
        bits,    // 选定色彩深度
        0, 0, 0, 0, 0, 0,   // 忽略的色彩位
        0,    // 无Alpha缓存
        0,    // 忽略Shift Bit
        0,    // 无累加缓存
        0, 0, 0, 0,    // 忽略聚集位
        16,    // 16位 Z-缓存 (深度缓存)
        0,    // 无蒙板缓存
        0,    // 无辅助缓存
        PFD_MAIN_PLANE,    // 主绘图层
        0,    // Reserved
        0, 0, 0    // 忽略层遮罩
    };
```

如果前面创建窗口时没有错误发生，我们接着尝试取得OpenGL设备描述表。若无法取得DC，弹出错误消息程序退出(返回FALSE)。

```c
    if (!(hDC=GetDC(hWnd)))    // 取得设备描述表了么?
    {
        KillGLWindow();    // 重置显示区
        MessageBox(NULL,"不能创建一种相匹配的像素格式","错误",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 返回 FALSE
    }
```

设法为OpenGL窗口取得设备描述表后，我们尝试找到对应与此前我们选定的象素格式的象素格式。如果Windows不能找到的话，弹出错误消息，并退出程序(返回FALSE)。

```c
    if (!(PixelFormat=ChoosePixelFormat(hDC,&pfd)))  // Windows 找到相应的象素格式了吗?
    {
        KillGLWindow();    // 重置显示区
        MessageBox(NULL,"不能设置像素格式","错误",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 返回 FALSE
    }
```

Windows 找到相应的象素格式后，尝试设置象素格式。如果无法设置，弹出错误消息，并退出程序(返回FALSE)。

```c
    if(!SetPixelFormat(hDC,PixelFormat,&pfd))  // 能够设置象素格式么?
    {
        KillGLWindow();    // 重置显示区
        MessageBox(NULL,"不能设置像素格式","错误",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 返回 FALSE
    }
```

正常设置象素格式后，尝试取得着色描述表。如果不能取得着色描述表的话，弹出错误消息，并退出程序(返回FALSE)。 

 

```c
    if (!(hRC=wglCreateContext(hDC)))   // 能否取得着色描述表?
    {
        KillGLWindow();    // 重置显示区
        MessageBox(NULL,"不能创建OpenGL渲染描述表","错误",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 返回 FALSE
    }
```

如果到现在仍未出现错误的话，我们已经设法取得了设备描述表和着色描述表。接着要做的是激活着色描述表。如果无法激活，弹出错误消息，并退出程序(返回FALSE)。

```c
    if(!wglMakeCurrent(hDC,hRC))   // 尝试激活着色描述表
    {
        KillGLWindow();    // 重置显示区
        MessageBox(NULL,"不能激活当前的OpenGL渲然描述表","错误",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 返回 FALSE
    }
```

一切顺利的话，OpenGL窗口已经创建完成，接着可以显示它啦。将它设为前端窗口(给它更高的优先级)，并将焦点移至此窗口。然后调用ReSizeGLScene 将屏幕的宽度和高度设置给透视OpenGL屏幕。

```c
    ShowWindow(hWnd,SW_SHOW);   // 显示窗口
    SetForegroundWindow(hWnd);   // 略略提高优先级
    SetFocus(hWnd);    // 设置键盘的焦点至此窗口
    ReSizeGLScene(width, height);   // 设置透视 GL 屏幕
```

跳转至 InitGL()，这里可以设置光照、纹理、等等任何需要设置的东东。您可以在 InitGL()内部自行定义错误检查，并返回 TRUE (一切正常)或FALSE (有什么不对)。例如，如果您在InitGL()内装载纹理并出现错误，您可能希望程序停止。如果您返回 FALSE的话，下面的代码会弹出错误消息，并退出程序。

```c
    if (!InitGL())    // 初始化新建的GL窗口
    {
        KillGLWindow();    // 重置显示区
        MessageBox(NULL,"Initialization Failed.","ERROR",MB_OK|MB_ICONEXCLAMATION);
        return FALSE;    // 返回 FALSE
    }
```

到这里可以安全的推定创建窗口已经成功了。我们向WinMain()返回TRUE，告知WinMain()没有错误，以防止程序退出。

```c
	return TRUE;    // 成功
}
```

下面的代码处理所有的窗口消息。当我们注册好窗口类之后，程序跳转到这部分代码处理窗口消息。

```c
LRESULT CALLBACK WndProc( HWND hWnd,   // 窗口的句柄
                         UINT uMsg,   // 窗口的消息
                         WPARAM wParam,   // 附加的消息内容
                         LPARAM lParam)   // 附加的消息内容
{
```

下面的代码比对uMsg的值，然后转入case处理，uMsg 中保存了我们要处理的消息名字。

```c
    switch (uMsg)    // 检查Windows消息
    {
```

如果uMsg等于WM_ACTIVE，查看窗口是否仍然处于激活状态。如果窗口已被最小化，将变量active设为FALSE。如果窗口已被激活，变量active的值为TRUE。

```c
        case WM_ACTIVATE:   // 监视窗口激活消息
        {
            if (!HIWORD(wParam))   // 检查最小化状态
            {
                active=TRUE;   // 程序处于激活状态
            }
            else
            {
                active=FALSE;   // 程序不再激活
            }

            return 0;   // 返回消息循环
        }
```

如果消息是WM_SYSCOMMAND(系统命令)，再次比对wParam。如果wParam 是 SC_SCREENSAVE 或 SC_MONITORPOWER的话，不是有屏幕保护要运行，就是显示器想进入节电模式。返回0可以阻止这两件事发生。

```c
        case WM_SYSCOMMAND:   // 系统中断命令
        {
            switch (wParam)   // 检查系统调用
            {
                case SC_SCREENSAVE:  // 屏保要运行?
                case SC_MONITORPOWER:  // 显示器要进入节电模式?
                    return 0;   // 阻止发生
            }
            break;    // 退出
        }
```

如果 uMsg是WM_CLOSE，窗口将被关闭。我们发出退出消息，主循环将被中断。变量done被设为TRUE，WinMain()的主循环中止，程序关闭。

```c
        case WM_CLOSE:    // 收到Close消息?
        {
            PostQuitMessage(0);   // 发出退出消息
            return 0;   // 返回
        }
```

如果键盘有键按下，通过读取wParam的信息可以找出键值。我将键盘数组keys[ ]相应的数组组成员的值设为TRUE。这样以后就可以查找key[ ]来得知什么键被按下。允许同时按下多个键。

```c
        case WM_KEYDOWN:   // 有键按下么?
        {
            keys[wParam] = TRUE;   // 如果是，设为TRUE
            return 0;   // 返回
        }
```

同样，如果键盘有键释放，通过读取wParam的信息可以找出键值。然后将键盘数组keys[ ]相应的数组组成员的值设为FALSE。这样查找key[ ]来得知什么键被按下，什么键被释放了。键盘上的每个键都可以用0-255之间的一个数来代表。举例来说，当我们按下40所代表的键时，keys[40]的值将被设为TRUE。放开的话，它就被设为FALSE。这也是key数组的原理。

```c
        case WM_KEYUP:    // 有键放开么?
        {
            keys[wParam] = FALSE;   // 如果是，设为FALSE
            return 0;   // 返回
        }
```

当调整窗口时，uMsg 最后等于消息WM_SIZE。读取lParam的LOWORD 和HIWORD可以得到窗口新的宽度和高度。将他们传递给ReSizeGLScene()，OpenGL场景将调整为新的宽度和高度。

```c
        case WM_SIZE:    // 调整OpenGL窗口大小
        {
            ReSizeGLScene(LOWORD(lParam),HIWORD(lParam)); // LoWord=Width,HiWord=Height
            return 0;   // 返回
        }
	}
```

其余无关的消息被传递给DefWindowProc，让Windows自行处理。

```c
    // 向 DefWindowProc传递所有未处理的消息。
    return DefWindowProc(hWnd,uMsg,wParam,lParam);
}
```

下面是我们的Windows程序的入口。将会调用窗口创建例程，处理窗口消息，并监视人机交互。

```c
int WINAPI WinMain( HINSTANCE hInstance,  // 当前窗口实例
                   HINSTANCE hPrevInstance,  // 前一个窗口实例
                   LPSTR lpCmdLine,  // 命令行参数
                   int nCmdShow)  // 窗口显示状态
{
```

我们设置两个变量。msg 用来检查是否有消息等待处理。done的初始值设为FALSE。这意味着我们的程序仍未完成运行。只要程序done保持FALSE，程序继续运行。一旦done的值改变为TRUE，程序退出。

```c
    MSG msg;    // Windowsx消息结构
    BOOL done=FALSE;    // 用来退出循环的Bool 变量
```

这段代码完全可选。程序弹出一个消息窗口，询问用户是否希望在全屏模式下运行。如果用户单击NO按钮，fullscreen变量从缺省的TRUE改变为FALSE，程序也改在窗口模式下运行。

```c
    // 提示用户选择运行模式
    if (MessageBox(NULL,"你想在全屏模式下运行么？", "设置全屏模式",MB_YESNO|MB_ICONQUESTION)==IDNO)
    {
        fullscreen=FALSE;   // FALSE为窗口模式
    }
```

接着创建OpenGL窗口。CreateGLWindow函数的参数依次为标题、宽度、高度、色彩深度，以及全屏标志。就这么简单！我很欣赏这段代码的简洁。如果未能创建成功，函数返回FALSE。程序立即退出。

```c
    // 创建OpenGL窗口
    if (!CreateGLWindow("NeHe's OpenGL程序框架",640,480,16,fullscreen))
    {
        return 0;    // 失败退出
    }
```

下面是循环的开始。只要done保持FALSE，循环一直进行。

```c
    while(!done)    // 保持循环直到 done=TRUE
    {
```

我们要做的第一件事是检查是否有消息在等待。使用PeekMessage()可以在不锁住我们的程序的前提下对消息进行检查。许多程序使用GetMessage()，也可以很好的工作。但使用GetMessage()，程序在收到paint消息或其他别的什么窗口消息之前不会做任何事。

```c
        if (PeekMessage(&msg,NULL,0,0,PM_REMOVE))  // 有消息在等待吗?
        {
```

下面的代码查看是否出现退出消息。如果当前的消息是由PostQuitMessage(0)引起的WM_QUIT，done变量被设为TRUE，程序将退出。

```c
            if (msg.message==WM_QUIT)  // 收到退出消息?
            {
                done=TRUE;   // 是，则done=TRUE
            }
            else    // 不是，处理窗口消息
            {
```

如果不是退出消息，我们翻译消息，然后发送消息，使得WndProc() 或 Windows能够处理他们。

```c
                TranslateMessage(&msg);  // 翻译消息
                DispatchMessage(&msg);  // 发送消息
            }
        }
        else    // 如果没有消息
        {
```

如果没有消息，绘制我们的OpenGL场景。代码的第一行查看窗口是否激活。如果按下ESC键，done变量被设为TRUE，程序将会退出。

```c
            // 绘制场景。监视ESC键和来自DrawGLScene()的退出消息
            if (active)   // 程序激活的么?
            {
                if (keys[VK_ESCAPE])  // ESC 按下了么?
                {
                    done=TRUE;  // ESC 发出退出信号
                }
                else   // 不是退出的时候，刷新屏幕
                {
```

如果程序是激活的且ESC没有按下，我们绘制场景并交换缓存(使用双缓存可以实现无闪烁的动画)。我们实际上在另一个看不见的"屏幕"上绘图。当我们交换缓存后，我们当前的屏幕被隐藏，现在看到的是刚才看不到的屏幕。这也是我们看不到场景绘制过程的原因。场景只是即时显示。 

```c
                    DrawGLScene();  // 绘制场景
                    SwapBuffers(hDC);  // 交换缓存 (双缓存)
                }
			}
```

下面的一点代码是最近新加的(05-01-00)。允许用户按下F1键在全屏模式和窗口模式间切换。

```c
            if (keys[VK_F1])   // F1键按下了么?
            {
                keys[VK_F1]=FALSE;  // 若是，使对应的Key数组中的值为 FALSE
                KillGLWindow();   // 销毁当前的窗口
                fullscreen=!fullscreen;  // 切换 全屏 / 窗口 模式
                // 重建 OpenGL 窗口
                if (!CreateGLWindow("NeHe's OpenGL 程序框架",640,480,16,fullscreen))
                {
                    return 0;  // 如果窗口未能创建，程序退出
                }
			}
		}
	}
```

如果done变量不再是FALSE，程序退出。正常销毁OpenGL窗口，将所有的内存释放，退出程序。

```c
    // 关闭程序
    KillGLWindow();    // 销毁窗口
    return (msg.wParam);    // 退出程序
}
```

在这一课中，我已试着尽量详细解释一切。每一步都与设置有关，并创建了一个全屏OpenGL程序。当您按下ESC键程序就会退出，并监视窗口是否激活。我花了整整2周时间来写代码，一周时间来改正BUG并讨论编程指南，2天(整整22小时来写HTML文件)。如果您有什么意见或建议请给我EMAIL。如果您认为有什么不对或可以改进，请告诉我。我想做最好的OpenGL教程并对您的反馈感兴趣。

版权与使用声明:
我是个对学习和生活充满激情的普通男孩,在网络上我以DancingWind为昵称，我的联系方式是zhouwei02@mails.tsinghua.edu.cn，如果你有任何问题，都可以联系我。
引子
网络是一个共享的资源，但我在自己的学习生涯中浪费大量的时间去搜索可用的资料，在现实生活中花费了大量的金钱和时间在书店中寻找资料，于是我给自己起了个昵称DancingWind，其意义是想风一样从各个知识的站点中吸取成长的养料。在飘荡了多年之后，我决定把自己收集的资料整理为一个统一的资源库。

版权声明
所有DancingWind发表的内容，大多都来自共享的资源，所以我没有资格把它们据为己有，或声称自己为这些资源作出了一点贡献。故任何人都可以复制，修改，重新发表，甚至以自己的名义发表，我都不会追究，但你在做以上事情的时候必须保证内容的完整性，给后来的人一个完整的教程。最后，任何人不能以这些资料的任何部分，谋取任何形式的报酬。

发展计划
在国外，很多资料都是很多人花费几年的时间慢慢积累起来的。如果任何人有兴趣与别人共享你的知识，我很欢迎你与我联系，但你必须同意我上面的声明。

感谢
感谢我的母亲一直以来对我的支持和在生活上的照顾。
感谢我深爱的女友田芹，一直以来默默的在精神上和生活中对我的支持，她甚至把买衣服的钱都用来给我买书了，她真的是我见过的最好的女孩，希望我能带给她幸福。

# 第二课 你的第一个多边形

在第一个教程的基础上，我们添加了一个三角形和一个四边形。也许你认为这很简单，但你已经迈出了一大步，要知道任何在OpenGL中绘制的模型都会被分解为这两种简单的图形。

读完了这一课，你会学到如何在空间放置模型，并且会知道深度缓存的概念。

第一课中，我教您如何创建一个OpenGL窗口。这一课中，我将教您如何创建三角形和四边形。我们讲使用来创建GL_TRIANGLES一个三角形，GL_QUADS来创建一个四边形。
在第一课代码的基础上，我们只需在DrawGLScene()过程中增加代码。下面我重写整个过程。如果您计划修改上节课的代码，只需用下面的代码覆盖原来的DrawGLScene()就可以了。

```c
int DrawGLScene(GLvoid)    // 此过程中包括所有的绘制代码
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);  // 清除屏幕及深度缓存
    glLoadIdentity();    // 重置当前的模型观察矩阵
```

当您调用glLoadIdentity()之后，您实际上将当前点移到了屏幕中心，X坐标轴从左至右，Y坐标轴从下至上，Z坐标轴从里至外。OpenGL屏幕中心的坐标值是X和Y轴上的0.0f点。中心左面的坐标值是负值，右面是正值。移向屏幕顶端是正值，移向屏幕底端是负值。移入屏幕深处是负值，移出屏幕则是正值。
glTranslatef(x, y, z)沿着 X, Y 和 Z 轴移动。根据前面的次序，下面的代码沿着X轴左移1.5个单位，Y轴不动(0.0f)，最后移入屏幕6.0f个单位。注意在glTranslatef(x, y, z)中当您移动的时候，您并不是相对屏幕中心移动，而是相对与当前所在的屏幕位置。

```c
	glTranslatef(-1.5f,0.0f,-6.0f);   // 左移 1.5 单位，并移入屏幕 6.0
```

现在我们已经移到了屏幕的左半部分，并且将视图推入屏幕背后足够的距离以便我们可以看见全部的场景－创建三角形。glBegin(GL_TRIANGLES)的意思是开始绘制三角形，glEnd() 告诉OpenGL三角形已经创建好了。通常您会需要画3个顶点，可以使用GL_TRIANGLES。在绝大多数的显卡上，绘制三角形是相当快速的。如果要画四个顶点，使用GL_QUADS的话会更方便。但据我所知，绝大多数的显卡都使用三角形来为对象着色。最后，如果您想要画更多的顶点时，可以使用GL_POLYGON。
本节的简单示例中，我们只画一个三角形。如果要画第二个三角形的话，可以在这三点之后，再加三行代码(3点)。所有六点代码都应包含在glBegin(GL_TRIANGLES) 和 glEnd()之间。在他们之间再不会有多余的点出现，也就是说，(GL_TRIANGLES) 和 glEnd()之间的点都是以三点为一个集合的。这同样适用于四边形。如果您知道实在绘制四边形的话，您必须在第一个四点之后，再加上四点为一个集合的点组。另一方面，多边形可以由任意个顶点，(GL_POLYGON)不在乎glBegin(GL_TRIANGLES) 和 glEnd()之间有多少行代码。

glBegin之后的第一行设置了多边形的第一个顶点，glVertex 的第一个参数是X坐标，然后依次是Y坐标和Z坐标。第一个点是上顶点，然后是左下顶点和右下顶点。glEnd()告诉OpenGL没有其他点了。这样将显示一个填充的三角形。

```c
    glBegin(GL_TRIANGLES);    // 绘制三角形
    glVertex3f( 0.0f, 1.0f, 0.0f);   // 上顶点
    glVertex3f(-1.0f,-1.0f, 0.0f);   // 左下
    glVertex3f( 1.0f,-1.0f, 0.0f);   // 右下
    glEnd();    // 三角形绘制结束
```

在屏幕的左半部分画完三角形后，我们要移到右半部分来画正方形。为此要再次使用glTranslate。这次右移，所以X坐标值为正值。因为前面左移了1.5个单位，这次要先向右移回屏幕中心(1.5个单位)，再向右移动1.5个单位。总共要向右移3.0个单位。 

```c
    glTranslatef(3.0f,0.0f,0.0f);   // 右移3单位
```

现在使用GL_QUADS绘制正方形。与绘制三角形的代码相类似，画四边形也很简单。唯一的区别是用GL_QUADS来替换了GL_TRIANGLES。并增加了一个点。我们使用顺时针次序来画正方形－左上－右上－右下－左下。采用顺时针绘制的是对象的后表面。这就是说我们所看见的是正方形的背面。逆时针画出来的正方形才是正面朝着我们的。现在这对您来说并不重要，但以后您必须知道。 

```c
    glBegin(GL_QUADS);    // 绘制正方形
    glVertex3f(-1.0f, 1.0f, 0.0f);   // 左上
    glVertex3f( 1.0f, 1.0f, 0.0f);   // 右上
    glVertex3f( 1.0f,-1.0f, 0.0f);   // 左下
    glVertex3f(-1.0f,-1.0f, 0.0f);   // 右下
    glEnd();    // 正方形绘制结束
    return TRUE;    // 继续运行
}
```

 最后换掉窗口模式下的标题内容。 

```c
if (keys[VK_F1])   // F1键按下了么?
{
    keys[VK_F1]=FALSE;  // 若是，使对应的Key数组中的值为 FALSE
    KillGLWindow();   // 销毁当前的窗口
    fullscreen=!fullscreen;  // 切换 全屏 / 窗口 模式
    // 重建 OpenGL 窗口(修改)
    if (!CreateGLWindow("NeHe's 第一个多边形程序",640,480,16,fullscreen))
    {
        return 0;  // 如果窗口未能创建，程序退出
    }
}
```


在这一课中，我已试着尽量详细的解释与多边形绘制有关的步骤。并创建了一个绘制三角形和正方形的OpenGL程序。如果您有什么意见或建议请给我EMAIL。如果您认为有什么不对或可以改进，请告诉我。我想做最好的OpenGL教程并对您的反馈感兴趣。

# 第三课 添加颜色

作为第二课的扩展，我将叫你如何使用颜色。你将理解两种着色模式，在左图中，三角形用的是光滑着色，四边形用的是平面着色。

上一课中我教给您三角形和四边形的绘制方法。这一课我将教您给三角形和四边形添加2种不同类型的着色方法。使用Flat coloring(单调着色)给四边形涂上固定的一种颜色。使用Smooth coloring(平滑着色)将三角形的三个顶点的不同颜色混合在一起，创建漂亮的色彩混合。
继续在上节课的DrawGLScene例程上修改。下面将整个例程重写了一遍。如果您计划修改上节课的代码，只需用下面的代码覆盖原来的DrawGLScene()就可以了。

```c
int DrawGLScene(GLvoid)    // 此过程中包括所有的绘制代码
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); // 清除屏幕及深度缓存
    glLoadIdentity();   // 重置模型观察矩阵
    glTranslatef(-1.5f,0.0f,-6.0f);   // 左移 1.5 单位，并移入屏幕 6.0

    glBegin(GL_TRIANGLES);   // 绘制三角形
```

如果您还记得上节课的内容，这段代码在屏幕的左半部分绘制三角形。下一行代码是我们第一次使用命令glColor3f(r,g,b)。括号中的三个参数依次是红、绿、蓝三色分量。取值范围可以从0,0f到1.0f。类似于以前所讲的清除屏幕背景命令。
我们将颜色设为红色(纯红色，无绿色，无蓝色)。接下来的一行代码设置三角形的第一个顶点(三角形的上顶点)，并使用当前颜色(红色)来绘制。从现在开始所有的绘制的对象的颜色都是红色，直到我们将红色改变成别的什么颜色。

```c
    glColor3f(1.0f,0.0f,0.0f);  // 设置当前色为红色
    glVertex3f( 0.0f, 1.0f, 0.0f);  // 上顶点
```

第一个红色顶点已经设置完毕。接下来我们设置第二个绿色顶点。三角形的左下顶点被设为绿色。 

```c
    glColor3f(0.0f,1.0f,0.0f);  // 设置当前色为绿色
    glVertex3f(-1.0f,-1.0f, 0.0f);  // 左下
```

现在设置第三个也就是最后一个顶点。开始绘制之前将颜色设为蓝色。这将是三角形的右下顶点。glEnd()出现后，三角形将被填充。但是因为每个顶点有不同的颜色，因此看起来颜色从每个角喷出，并刚好在三角形的中心汇合，三种颜色相互混合。这就是平滑着色。 

```c
    glColor3f(0.0f,0.0f,1.0f);  // 设置当前色为蓝色
    glVertex3f( 1.0f,-1.0f, 0.0f);  // 右下
    glEnd();    // 三角形绘制结束

    glTranslatef(3.0f,0.0f,0.0f);   // 右移3单位
```

现在我们绘制一个单调着色－蓝色的正方形。最重要的是要记住，设置当前色之后绘制的所有东东都是当前色的。以后您所创建的每个工程都要使用颜色。即便是在完全采用纹理贴图的时候，glColor3f仍旧可以用来调节纹理的色调。等等....,以后再说吧。
我们必须要做的事只需将颜色一次性的设为我们想采用的颜色(本例采用蓝色)，然后绘制场景。每个顶点都是蓝色的，因为我们没有告诉OpenGL要改变顶点的颜色。最后的结果是.....全蓝色的正方形。再说一遍，顺时针绘制的正方形意味着我们所看见的是四边形的背面。

```c
    glColor3f(0.5f,0.5f,1.0f);   // 一次性将当前色设置为蓝色
    glBegin(GL_QUADS);   // 绘制正方形
    glVertex3f(-1.0f, 1.0f, 0.0f);  // 左上
    glVertex3f( 1.0f, 1.0f, 0.0f);  // 右上
    glVertex3f( 1.0f,-1.0f, 0.0f);  // 左下
    glVertex3f(-1.0f,-1.0f, 0.0f);  // 右下
    glEnd();    // 正方形绘制结束
    return TRUE;    // 继续运行
}
```

最后换掉窗口模式下的标题内容 

```c
// 重建 OpenGL 窗口
if (!CreateGLWindow("NeHe's颜色实例",640,480,16,fullscreen))
```


在这一课中，我试着尽量详细的解释如何为您的OpenGL多边形添加单调和平滑的着色效果的步骤。改改代码中的红绿蓝分量值，看看最后y有什么样的结果。如果您有什么意见或建议请给我EMAIL。如果您认为有什么不对或可以改进，请告诉我。我想做最好的OpenGL教程并对您的反馈感兴趣。

# 第四课 旋转

在这一课里，我将教会你如何旋转三角形和四边形。左图中的三角形沿Y轴旋转，四边形沿着X轴旋转。
上一课中我教给您三角形和四边形的着色。这一课我将教您如何将这些彩色对象绕着坐标轴旋转。
其实只需在上节课的代码上增加几行就可以了。下面我将整个例程重写一遍。方便您知道增加了什么，修改了什么。
我们增加两个变量来控制这两个对象的旋转。这两个变量加在程序的开始处其他变量的后面( bool fullscreen=TRUE;下面的两行)。它们是浮点类型的变量，使得我们能够非常精确地旋转对象。浮点数包含小数位置，这意味着我们无需使用1、2、3...的角度。你会发现浮点数是OpenGL编程的基础。新变量中叫做 rtri 的用来旋转三角形， rquad 旋转四边形。 

```c
GLfloat rtri;   // 用于三角形的角度
GLfloat rquad;   // 用于四边形的角度
```

接着我们修改DrawGLScene()的代码。
下面这段代码与上一课的相同。 

```c
int DrawGLScene(GLvoid)   // 此过程中包括所有的绘制代码
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); // 清除屏幕及深度缓存
    glLoadIdentity();   // 重置模型观察矩阵
    glTranslatef(-1.5f,0.0f,-6.0f);  // 左移 1.5 单位，并移入屏幕 6.0
```

下一行代码是新的。glRotatef(Angle,Xvector,Yvector,Zvector)负责让对象绕某个轴旋转。这个命令有很多用处。 Angle 通常是个变量代表对象转过的角度。 Xvector , Yvector 和 Zvector 三个参数则共同决定旋转轴的方向。比如(1,0,0)所描述的矢量经过X坐标轴的1个单位处并且方向向右。(-1,0,0)所描述的矢量经过X坐标轴的1个单位处，但方向向左。
D. Michael Traub:提供了对 Xvector , Yvector 和 Zvector 的上述解释。
为了更好的理解X, Y 和 Z的旋转，我举些例子...
X轴－您正在使用一台台锯。锯片中心的轴从左至右摆放(就像OpenGL中的X轴)。尖利的锯齿绕着X轴狂转，看起来要么向上转，要么向下转。取决于锯片开始转时的方向。这与我们在OpenGL中绕着X轴旋转什么的情形是一样的。(译者注：这会儿您要把脸蛋凑向显示器的话，保准被锯开了花 ^-^。)

Y轴－假设您正处于一个巨大的龙卷风中心，龙卷风的中心从地面指向天空(就像OpenGL中的Y轴)。垃圾和碎片围着Y轴从左向右或是从右向左狂转不止。这与我们在OpenGL中绕着Y轴旋转什么的情形是一样的。

Z轴－您从正前方看着一台风扇。风扇的中心正好朝着您(就像OpenGL中的Z轴)。风扇的叶片绕着Z轴顺时针或逆时针狂转。这与我们在OpenGL中绕着Z轴旋转什么的情形是一样的。

下面的一行代码中，如果rtri等于7，我们将三角形绕着Y轴从左向右旋转7 。您也可以改变参数的值，让三角形绕着X和Y轴同时旋转。

```c
    glRotatef(rtri,0.0f,1.0f,0.0f);  // 绕Y轴旋转三角形
```

 下面的代码没有变化。在屏幕的左面画了一个彩色渐变三角形，并绕着Y轴从左向右旋转。 

```c
    glBegin(GL_TRIANGLES);   // 绘制三角形
    glColor3f(1.0f,0.0f,0.0f);  // 设置当前色为红色
    glVertex3f( 0.0f, 1.0f, 0.0f);  // 上顶点
    glColor3f(0.0f,1.0f,0.0f);  // 设置当前色为绿色
    glVertex3f(-1.0f,-1.0f, 0.0f);  // 左下
    glColor3f(0.0f,0.0f,1.0f);  // 设置当前色为蓝色
    glVertex3f( 1.0f,-1.0f, 0.0f);  // 右下
    glEnd();   // 三角形绘制结束
```

您会注意下面的代码中我们增加了另一个glLoadIdentity()调用。目的是为了重置模型观察矩阵。如果我们没有重置，直接调用glTranslate的话，会出现意料之外的结果。因为坐标轴已经旋转了，很可能没有朝着您所希望的方向。所以我们本来想要左右移动对象的，就可能变成上下移动了，取决于您将坐标轴旋转了多少角度。试试将glLoadIdentity() 注释掉之后，会出现什么结果。
重置模型观察矩阵之后，X，Y，Z轴都以复位，我们调用glTranslate。您会注意到这次我们只向右一了1.5单位，而不是上节课的3.0单位。因为我们重置场景的时候，焦点又回到了场景的中心(0.0处)。这样就只需向右移1.5单位就够了。
当我们移到新位置后，绕X轴旋转四边形。正方形将上下转动。

```c
    glLoadIdentity();   // 重置模型观察矩阵
    glTranslatef(1.5f,0.0f,-6.0f);  // 右移1.5单位,并移入屏幕 6.0
    glRotatef(rquad,1.0f,0.0f,0.0f);  // 绕X轴旋转四边形
```

下一段代码保持不变。在屏幕的右侧画一个蓝色的正方形 

```c
    glColor3f(0.5f,0.5f,1.0f);  // 一次性将当前色设置为蓝色
    glBegin(GL_QUADS);   // 绘制正方形
    glVertex3f(-1.0f, 1.0f, 0.0f);  // 左上
    glVertex3f( 1.0f, 1.0f, 0.0f);  // 右上
    glVertex3f( 1.0f,-1.0f, 0.0f);  // 左下
    glVertex3f(-1.0f,-1.0f, 0.0f);  // 右下
    glEnd();   // 正方形绘制结束
```

下两行是新增的。倘若把 rtri 和 rquad 想象为容器，那么在程序的开始我们创建了容器( GLfloat rtri , 和 GLfloat rquad )。当容器创建之后，里面是空的。下面的第一行代码是向容器中添加0.2。因此每次当我们运行完前面的代码后，都会在这里使 rtri 容器中的值增长0.2。后面一行将 rquad 容器中的值减少0.15。同样每次当我们运行完前面的代码后，都会在这里使 rquad 容器中的值下跌0.15。下跌最终会导致对象旋转的方向和增长的方向相反。
尝试改变下面代码中的+和-，来体会对象旋转的方向是如何改变的。并试着将0.2改成1.0。这个数字越大，物体就转的越快，这个数字越小，物体转的就越慢。

```c
    rtri+=0.2f;   // 增加三角形的旋转变量
    rquad-=0.15f;   // 减少四边形的旋转变量
    return TRUE;   // 继续运行
}
```

最后换掉窗口模式下的标题内容 

```c
// 重建 OpenGL 窗口
if (!CreateGLWindow("NeHe's 旋转实例",640,480,16,fullscreen))
```

在这一课中，我试着尽量详细的解释如何让对象绕某个轴转动。改改代码，试着让对象绕着Z轴、X+Y轴或者所有三个轴来转动:)。如果您有什么意见或建议请给我EMAIL。如果您认为有什么不对或可以改进，请告诉我。我想做最好的OpenGL教程并对您的反馈感兴趣。

# 第五课 3D空间

我们使用多边形和四边形创建3D物体，在这一课里，我们把三角形变为立体的金子塔形状，把四边形变为立方体。

在上节课的内容上作些扩展，我们现在开始生成真正的3D对象，而不是象前两节课中那样3D世界中的2D对象。我们给三角形增加一个左侧面，一个右侧面，一个后侧面来生成一个金字塔(四棱锥)。给正方形增加左、右、上、下及背面生成一个立方体。
我们混合金字塔上的颜色，创建一个平滑着色的对象。给立方体的每一面则来个不同的颜色。

```c
int DrawGLScene(GLvoid)   // 此过程中包括所有的绘制代码
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT); // 清除屏幕及深度缓存
    glLoadIdentity();   // 重置模型观察矩阵
    glTranslatef(-1.5f,0.0f,-6.0f);  // 左移 1.5 单位，并移入屏幕 6.0

    glRotatef(rtri,0.0f,1.0f,0.0f);  // 绕Y轴旋转金字塔

    glBegin(GL_TRIANGLES);   // 开始绘制金字塔的各个面
```

有些人可能早已在上节课中的代码上尝试自行创建3D对象了。但经常有人来信问我:"我的对象怎么不会绕着其自身的轴旋转？看起来总是在满屏乱转。"要让您的对象绕自身的轴旋转，您必须让对象的中心坐标总是(0.0f,0,0f,0,0f)。
下面的代码创建一个绕者其中心轴旋转的金字塔。金字塔的上顶点高出原点一个单位，底面中心低于原点一个单位。上顶点在底面的投影位于底面的中心。
注意所有的面－三角形都是逆时针次序绘制的。这点十分重要，在以后的课程中我会作出解释。现在，您只需明白要么都逆时针，要么都顺时针，但永远不要将两种次序混在一起，除非您有足够的理由必须这么做。

我们开始画金字塔的前侧面。因为所有的面都共享上顶点，我们将这点在所有的三角形中都设置为红色。底边上的两个顶点的颜色则是互斥的。前侧面的左下顶点是绿色的，右下顶点是蓝色的。这样相邻右侧面的左下顶点是蓝色的，右下顶点是绿色的。这样四边形的底面上的点的颜色都是间隔排列的。

```c
    glColor3f(1.0f,0.0f,0.0f);  // 红色
    glVertex3f( 0.0f, 1.0f, 0.0f);  // 三角形的上顶点 (前侧面)
    glColor3f(0.0f,1.0f,0.0f);  // 绿色
    glVertex3f(-1.0f,-1.0f, 1.0f);  // 三角形的左下顶点 (前侧面)
    glColor3f(0.0f,0.0f,1.0f);  // 蓝色
    glVertex3f( 1.0f,-1.0f, 1.0f);  // 三角形的右下顶点 (前侧面)
```

现在绘制右侧面。注意其底边上的两个顶点的X坐标位于中心右侧的一个单位处。顶点则位于Y轴上的一单位处，且Z坐标正好处于底边的两顶点的Z坐标中心。右侧面从上顶点开始向外侧倾斜至底边上。
这次的左下顶点用蓝色绘制，以保持与前侧面的右下顶点的一致。蓝色将从这个角向金字塔的前侧面和右侧面扩展并与其他颜色混合。
还应注意到后面的三个侧面和前侧面处于同一个glBegin(GL_TRIANGLES) 和 glEnd()语句中间。因为我们是通过三角形来构造这个金字塔的。OpenGL知道每三个点构成一个三角形。当它画完一个三角形之后，如果还有余下的点出现，它就以为新的三角形要开始绘制了。OpenGL在这里并不会将四点画成一个四边形，而是假定新的三角形开始了。所以千万不要无意中增加任何多余的点。 

```c
    glColor3f(1.0f,0.0f,0.0f);  // 红色
    glVertex3f( 0.0f, 1.0f, 0.0f);  // 三角形的上顶点 (右侧面)
    glColor3f(0.0f,0.0f,1.0f);  // 蓝色
    glVertex3f( 1.0f,-1.0f, 1.0f);  // 三角形的左下顶点 (右侧面)
    glColor3f(0.0f,1.0f,0.0f);  // 绿色
    glVertex3f( 1.0f,-1.0f, -1.0f);  // 三角形的右下顶点 (右侧面)
```

现在是后侧面。再次切换颜色。左下顶点又回到绿色，因为后侧面与右侧面共享这个角。 

```c
    glColor3f(1.0f,0.0f,0.0f);  // 红色
    glVertex3f( 0.0f, 1.0f, 0.0f);  // 三角形的上顶点 (后侧面)
    glColor3f(0.0f,1.0f,0.0f);  // 绿色
    glVertex3f( 1.0f,-1.0f, -1.0f);  // 三角形的左下顶点 (后侧面)
    glColor3f(0.0f,0.0f,1.0f);  // 蓝色
    glVertex3f(-1.0f,-1.0f, -1.0f);  // 三角形的右下顶点 (后侧面)
```

最后画左侧面。又要切换颜色。左下顶点是蓝色，与后侧面的右下顶点相同。右下顶点是蓝色，与前侧面的左下顶点相同。
到这里金字塔就画完了。因为金字塔只绕着Y轴旋转，我们永远都看不见底面，因而没有必要添加底面。如果您觉得有经验了，尝试增加底面(正方形)，并将金字塔绕X轴旋转来看看您是否作对了。确保底面四个顶点的颜色与侧面的颜色相匹配。 

```c
    glColor3f(1.0f,0.0f,0.0f);  // 红色
    glVertex3f( 0.0f, 1.0f, 0.0f);  // 三角形的上顶点 (左侧面)
    glColor3f(0.0f,0.0f,1.0f);  // 蓝色
    glVertex3f(-1.0f,-1.0f,-1.0f);  // 三角形的左下顶点 (左侧面)
    glColor3f(0.0f,1.0f,0.0f);  // 绿色
    glVertex3f(-1.0f,-1.0f, 1.0f);  // 三角形的右下顶点 (左侧面)
    glEnd();   // 金字塔绘制结束
```

接下来开始画立方体。他由六个四边形组成。所有的四边形都以逆时针次序绘制。就是说先画右上角，然后左上角、左下角、最后右下角。您也许认为画立方体的背面的时候这个次序看起来好像顺时针，但别忘了我们从立方体的背后看背面的时候，与您现在所想的正好相反。(译者注：您是从立方体的外面来观察立方体的)。
注意到这次我们将立方体移地更远离屏幕了。因为立方体的大小要比金字塔大，同样移入6个单位时，立方体看起来要大的多。这是透视的缘故。越远的对象看起来越小 :) 。 

```c
    glLoadIdentity();
    glTranslatef(1.5f,0.0f,-7.0f);  // 先右移再移入屏幕

    glRotatef(rquad,1.0f,1.0f,1.0f);  // 在XYZ轴上旋转立方体

    glBegin(GL_QUADS);   // 开始绘制立方体
```

先画立方体的顶面。从中心上移一单位，注意Y坐标始终为一单位，表示这个四边形与Z轴平行。先画右上顶点，向右一单位，再屏幕向里一单位。然后左上顶点，向左一单位，再屏幕向里一单位。然后是靠近观察者的左下和右下顶点。就是屏幕往外一单位。 

```c
    glColor3f(0.0f,1.0f,0.0f);  // 颜色改为蓝色
    glVertex3f( 1.0f, 1.0f,-1.0f);  // 四边形的右上顶点 (顶面)
    glVertex3f(-1.0f, 1.0f,-1.0f);  // 四边形的左上顶点 (顶面)
    glVertex3f(-1.0f, 1.0f, 1.0f);  // 四边形的左下顶点 (顶面)
    glVertex3f( 1.0f, 1.0f, 1.0f);  // 四边形的右下顶点 (顶面)
```

底面的画法和顶面十分类似。只是Y坐标变成了－1。如果我们从立方体的下面来看立方体的话，您会注意到右上角离观察者最近，因此我们先画离观察者最近的顶点。然后是左上顶点最后才是屏幕里面的左下和右下顶点。
如果您真的不在乎绘制多边形的次序(顺时针或者逆时针)的话，您可以直接拷贝顶面的代码，将Y坐标从1改成 -1，也能够工作。但一旦您进入象纹理映射这样的领域时，忽略绘制次序会导致十分怪异的结果。

```c
    glColor3f(1.0f,0.5f,0.0f);  // 颜色改成橙色
    glVertex3f( 1.0f,-1.0f, 1.0f);  // 四边形的右上顶点(底面)
    glVertex3f(-1.0f,-1.0f, 1.0f);  // 四边形的左上顶点(底面)
    glVertex3f(-1.0f,-1.0f,-1.0f);  // 四边形的左下顶点(底面)
    glVertex3f( 1.0f,-1.0f,-1.0f);  // 四边形的右下顶点(底面)
```

接着画立方体的前面。保持Z坐标为一单位，前面正对着我们。 

```c
    glColor3f(1.0f,0.0f,0.0f);  // 颜色改成红色
    glVertex3f( 1.0f, 1.0f, 1.0f);  // 四边形的右上顶点(前面)
    glVertex3f(-1.0f, 1.0f, 1.0f);  // 四边形的左上顶点(前面)
    glVertex3f(-1.0f,-1.0f, 1.0f);  // 四边形的左下顶点(前面)
    glVertex3f( 1.0f,-1.0f, 1.0f);  // 四边形的右下顶点(前面)
```

立方体后面的绘制方法与前面类似。只是位于屏幕的里面。注意Z坐标现在保持 -1 不变。 

```c
    glColor3f(1.0f,1.0f,0.0f);  // 颜色改成黄色
    glVertex3f( 1.0f,-1.0f,-1.0f);  // 四边形的右上顶点(后面)
    glVertex3f(-1.0f,-1.0f,-1.0f);  // 四边形的左上顶点(后面)
    glVertex3f(-1.0f, 1.0f,-1.0f);  // 四边形的左下顶点(后面)
    glVertex3f( 1.0f, 1.0f,-1.0f);  // 四边形的右下顶点(后面)
```

还剩两个面就完成了。您会注意到总有一个坐标保持不变。这一次换成了X坐标。因为我们在画左侧面。 

```c
    glColor3f(0.0f,0.0f,1.0f);  // 颜色改成蓝色
    glVertex3f(-1.0f, 1.0f, 1.0f);  // 四边形的右上顶点(左面)
    glVertex3f(-1.0f, 1.0f,-1.0f);  // 四边形的左上顶点(左面)
    glVertex3f(-1.0f,-1.0f,-1.0f);  // 四边形的左下顶点(左面)
    glVertex3f(-1.0f,-1.0f, 1.0f);  // 四边形的右下顶点(左面)
```

立方体的最后一个面了。X坐标保持为一单位。逆时针绘制。您愿意的话，留着这个面不画也可以，这样就是一个盒子:)
或者您要是有兴趣可以改变立方体所有顶点的色彩值，象金字塔那样混合颜色。您会看见一个非常漂亮的彩色立方体，各种颜色在它的各个表面流淌。

```c
    glColor3f(1.0f,0.0f,1.0f);  // 颜色改成紫罗兰色
    glVertex3f( 1.0f, 1.0f,-1.0f);  // 四边形的右上顶点(右面)
    glVertex3f( 1.0f, 1.0f, 1.0f);  // 四边形的左上顶点(右面)
    glVertex3f( 1.0f,-1.0f, 1.0f);  // 四边形的左下顶点(右面)
    glVertex3f( 1.0f,-1.0f,-1.0f);  // 四边形的右下顶点(右面)
    glEnd();   // 立方体绘制结束

    rtri+=0.2f;   // 增加三角形的旋转变量
    rquad-=0.15f;   // 减少四边形的旋转变量
    return TRUE;   // 继续运行
}
```

这一课又结束了。到这里您应该已经较好的掌握了在3D空间创建对象的方法。必须将OpenGL屏幕想象成一张很大的画纸，后面还带着许多透明的层。差不多就是个由大量的点组成的立方体。这些点从左至右、从上至下、从前到后的布满了这个立方体。如果您能想象的出在屏幕的深度方向，应该在设计新3D对象时没有任何问题。
如果您对3D空间的理解很困难的话，千万不要灰心! 刚开始的时候，领会这些内容会很难。象立方体这样的对象是您练习的好例子。继续努力吧！如果您有什么意见或建议请给我EMAIL。如果您认为有什么不对或可以改进，请告诉我。我想做最好的OpenGL教程并对您的反馈感兴趣。

# 第六课 纹理映射

在这一课里，我将教会你如何把纹理映射到立方体的六个面。

学习 texture map 纹理映射(贴图)有很多好处。比方说您想让一颗导弹飞过屏幕。根据前几课的知识，我们最可行的办法可能是很多个多边形来构建导弹的轮廓并加上有趣的颜色。使用纹理映射，您可以使用真实的导弹图像并让它飞过屏幕。您觉得哪个更好看？照片还是一大堆三角形和四边形？使用纹理映射的好处还不止是更好看，而且您的程序运行会更快。导弹贴图可能只是一个飞过窗口的四边形。一个由多边形构建而来的导弹却很可能包括成百上千的多边形。很显然，贴图极大的节省了CPU时间。
现在我们在第一课的代码开始处增加五行新代码。新增的第一行是 #include <stdio.h> 。它允许我们对文件进行操作，为了在后面的代码中使用 fopen() ，我们增加了这一行。然后我们增加了三个新的浮点变量... xrot , yrot 和 zrot 。这些变量用来使立方体绕X、Y、Z轴旋转。最后一行 GLuint texture[1] 为一个纹理分配存储空间。如果您需要不止一个的纹理，应该将参数1改成您所需要的参数。 

```c
#include <stdio.h>    // 标准输入/输出库的头文件
#include <glaux.h>    // GLaux库的头文件

GLfloat xrot;    // X 旋转量
GLfloat yrot;    // Y 旋转量
GLfloat zrot;    // Z 旋转量

GLuint texture[1];    // 存储一个纹理
```

紧跟上面的代码在 ReSizeGLScene() 之前，我们增加了下面这一段代码。这段代码用来加载位图文件。如果文件不存在，返回 NULL 告知程序无法加载位图。在我开始解释这段代码之前，关于用作纹理的图像我想有几点十分重要，并且您必须明白。此图像的宽和高必须是2的n次方；宽度和高度最小必须是64象素；并且出于兼容性的原因，图像的宽度和高度不应超过256象素。如果您的原始素材的宽度和高度不是64,128,256象素的话，使用图像处理软件重新改变图像的大小。可以肯定有办法能绕过这些限制，但现在我们只需要用标准的纹理尺寸。
首先，我们创建一个文件句柄。句柄是个用来鉴别资源的数值，它使程序能够访问此资源。我们开始先将句柄设为 NULL 。

```c
AUX_RGBImageRec *LoadBMP(char *Filename)   // 载入位图图象
{
    FILE *File=NULL;    // 文件句柄
```

接下来检查文件名是否已提供。因为 LoadBMP() 可以无参数调用，所以我们不得不检查一下。您可不想什么都没载入吧.....:) 

```c
    if (!Filename)    // 确保文件名已提供
    {
        return NULL;    // 如果没提供，返回 NULL
    }
```

接着检查文件是否存在。下面这一行尝试打开文件。 

```c
    File=fopen(Filename,"r");   // 尝试打开文件
```

如果我们能打开文件的话，很显然文件是存在的。使用 fclose(File) 关闭文件。 auxDIBImageLoad(Filename) 读取图象数据并将其返回。 

```c
    if (File)    // 文件存在么?
    {
        fclose(File);    // 关闭句柄
        return auxDIBImageLoad(Filename);  // 载入位图并返回指针
    }
```

如果我们不能打开文件，我们将返回NULL。这意味着文件无法载入。程序在后面将检查文件是否已载入。如果没有，我们将退出程序并弹出错误消息。 

```c
    return NULL;    // 如果载入失败，返回 NULL
}
```

下一部分代码载入位图(调用上面的代码)并转换成纹理。 

```c
int LoadGLTextures()    // 载入位图(调用上面的代码)并转换成纹理
{
```

然后设置一个叫做 Status 的变量。我们使用它来跟踪是否能够载入位图以及能否创建纹理。 Status 缺省设为 FALSE (表示没有载入或创建任何东东)。 

```c
	int Status=FALSE;    // 状态指示器
```

现在我们创建存储位图的图像记录。次记录包含位图的宽度、高度和数据。 

```c
    AUX_RGBImageRec *TextureImage[1];   // 创建纹理的存储空间
```

清除图像记录，确保其内容为空 

```c
    memset(TextureImage,0,sizeof(void *)*1);  // 将指针设为 NULL
```

现在载入位图，并将其转换为纹理。 TextureImage[0]=LoadBMP("Data/NeHe.bmp") 调用 LoadBMP() 的代码。载入 Data 目录下的 NeHe.bmp 位图文件。如果一切正常，图像数据将存放在 TextureImage[0] 中， Status 被设为 TRUE ，然后我们开始创建纹理。 

```c
    // 载入位图，检查有无错误，如果位图没找到则退出
    if (TextureImage[0]=LoadBMP("Data/NeHe.bmp"))
    {
        Status=TRUE;    // 将 Status 设为 TRUE
```

现在使用中 TextureImage[0] 的数据创建纹理。第一行 glGenTextures(1, &texture[0]) 告诉OpenGL我们想生成一个纹理名字(如果您想载入多个纹理，加大数字)。值得注意的是，开始我们使用 GLuint texture[1] 来创建一个纹理的存储空间，您也许会认为第一个纹理就是存放在 &texture[1] 中的，但这是错的。正确的地址应该是 &texture[0] 。同样如果使用 GLuint texture[2] 的话，第二个纹理存放在 texture[1] 中。『译者注：学C的，在这里应该没有障碍，数组就是从零开始的嘛。』
第二行 glBindTexture(GL_TEXTURE_2D, texture[0]) 告诉OpenGL将纹理名字 texture[0] 绑定到纹理目标上。2D纹理只有高度(在 Y 轴上)和宽度(在 X 轴上)。主函数将纹理名字指派给纹理数据。本例中我们告知OpenGL， &texture[0] 处的内存已经可用。我们创建的纹理将存储在 &texture[0] 的 指向的内存区域。

```c
        glGenTextures(1, &texture[0]);   // 创建纹理
        // 使用来自位图数据生成 的典型纹理
        glBindTexture(GL_TEXTURE_2D, texture[0]);
```

下来我们创建真正的纹理。下面一行告诉OpenGL此纹理是一个2D纹理 ( GL_TEXTURE_2D )。参数“0”代表图像的详细程度，通常就由它为零去了。参数三是数据的成分数。因为图像是由红色数据，绿色数据，蓝色数据三种组分组成。 TextureImage[0]->sizeX 是纹理的宽度。如果您知道宽度，您可以在这里填入，但计算机可以很容易的为您指出此值。 TextureImage[0]->sizey 是纹理的高度。参数零是边框的值，一般就是“0”。 GL_RGB 告诉OpenGL图像数据由红、绿、蓝三色数据组成。
GL_UNSIGNED_BYTE 意味着组成图像的数据是无符号字节类型的。最后... TextureImage[0]->data 告诉OpenGL纹理数据的来源。此例中指向存放在 TextureImage[0] 记录中的数据。 

```c
        // 生成纹理
        glTexImage2D(GL_TEXTURE_2D, 0, 3, TextureImage[0]->sizeX, TextureImage[0]->sizeY, 0, GL_RGB, GL_UNSIGNED_BYTE, TextureImage[0]->data);
```

下面的两行告诉OpenGL在显示图像时，当它比放大得原始的纹理大 ( GL_TEXTURE_MAG_FILTER )或缩小得比原始得纹理小( GL_TEXTURE_MIN_FILTER )时OpenGL采用的滤波方式。通常这两种情况下我都采用 GL_LINEAR 。这使得纹理从很远处到离屏幕很近时都平滑显示。使用 GL_LINEAR 需要CPU和显卡做更多的运算。如果您的机器很慢，您也许应该采用 GL_NEAREST 。过滤的纹理在放大的时候，看起来斑驳的很『译者注：马赛克啦』。您也可以结合这两种滤波方式。在近处时使用 GL_LINEAR ，远处时 GL_NEAREST 。 

```c
        glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MIN_FILTER,GL_LINEAR); // 线形滤波
        glTexParameteri(GL_TEXTURE_2D,GL_TEXTURE_MAG_FILTER,GL_LINEAR); // 线形滤波
    }
```

现在我们释放前面用来存放位图数据的内存。我们先查看位图数据是否存放在处。如果是的话，再查看数据是否已经存储。如果已经存储的话，删了它。接着再释放 TextureImage[0] 图像结构以保证所有的内存都能释放。 

```c
    if (TextureImage[0])    // 纹理是否存在
    {
        if (TextureImage[0]->data)   // 纹理图像是否存在
        {
            free(TextureImage[0]->data);  // 释放纹理图像占用的内存
        }

        free(TextureImage[0]);   // 释放图像结构
    }
```


最后返回状态变量。如果一切OK，变量 Status 的值为 TRUE 。否则为 FALSE 。 

```c
    return Status;    // 返回 Status
}
```

我只在 InitGL 中增加很少的几行代码。但为了方便您查看增加了哪几行，我这段代码全部重贴一遍。 if (!LoadGLTextures()) 这行代码调用上面讲的子例程载入位图并生成纹理。如果因为任何原因 LoadGLTextures() 调用失败，接着的一行返回FALSE。如果一切OK，并且纹理创建好了，我们启用2D纹理映射。如果您忘记启用的话，您的对象看起来永远都是纯白色，这一定不是什么好事。 

```c
int InitGL(GLvoid)    // 此处开始对OpenGL进行所有设置
{
    if (!LoadGLTextures())    // 调用纹理载入子例程
    {
        return FALSE;    // 如果未能载入，返回FALSE
    }

    glEnable(GL_TEXTURE_2D);   // 启用纹理映射
    glShadeModel(GL_SMOOTH);   // 启用阴影平滑
    glClearColor(0.0f, 0.0f, 0.0f, 0.5f);   // 黑色背景
    glClearDepth(1.0f);    // 设置深度缓存
    glEnable(GL_DEPTH_TEST);   // 启用深度测试
    glDepthFunc(GL_LEQUAL);    // 所作深度测试的类型
    glHint(GL_PERSPECTIVE_CORRECTION_HINT, GL_NICEST);  // 真正精细的透视修正
    return TRUE;    // 初始化 OK
}
```

现在我们绘制贴图『译者注：其实贴图就是纹理映射。将术语换来换去不好，我想少打俩字。^_^』过的立方体。这段代码被狂注释了一把，应该很好懂。开始两行代码 glClear() 和 glLoadIdentity() 是第一课中就有的代码。 glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT) 清除屏幕并设为我们在 InitGL() 中选定的颜色，本例中是黑色。深度缓存也被清除。模型观察矩阵也使用glLoadIdentity()重置。 

```c
int DrawGLScene(GLvoid)    // 从这里开始进行所有的绘制
{
    glClear(GL_COLOR_BUFFER_BIT | GL_DEPTH_BUFFER_BIT);  // 清除屏幕和深度缓存
    glLoadIdentity();    // 重置当前的模型观察矩阵
    glTranslatef(0.0f,0.0f,-5.0f);   // 移入屏幕 5 个单位
```

下面三行使立方体绕X、Y、Z轴旋转。旋转多少依赖于变量 xrot ， yrot 和 zrot 的值。 

```c
    glRotatef(xrot,1.0f,0.0f,0.0f);   // 绕X轴旋转
    glRotatef(yrot,0.0f,1.0f,0.0f);   // 绕Y轴旋转
    glRotatef(zrot,0.0f,0.0f,1.0f);   // 绕Z轴旋转
```

下一行代码选择我们使用的纹理。如果您在您的场景中使用多个纹理，您应该使用来 glBindTexture(GL_TEXTURE_2D, texture[ 所使用纹理对应的数字 ]) 选择要绑定的纹理。当您想改变纹理时，应该绑定新的纹理。有一点值得指出的是，您不能在 glBegin() 和 glEnd() 之间绑定纹理，必须在 glBegin() 之前或 glEnd() 之后绑定。注意我们在后面是如何使用 glBindTexture 来指定和绑定纹理的。 

```c
    glBindTexture(GL_TEXTURE_2D, texture[0]);  // 选择纹理
```

为了将纹理正确的映射到四边形上，您必须将纹理的右上角映射到四边形的右上角，纹理的左上角映射到四边形的左上角，纹理的右下角映射到四边形的右下角，纹理的左下角映射到四边形的左下角。如果映射错误的话，图像显示时可能上下颠倒，侧向一边或者什么都不是。
glTexCoord2f 的第一个参数是X坐标。 0.0f 是纹理的左侧。 0.5f 是纹理的中点， 1.0f 是纹理的右侧。 glTexCoord2f 的第二个参数是Y坐标。 0.0f 是纹理的底部。 0.5f 是纹理的中点， 1.0f 是纹理的顶部。

所以纹理的左上坐标是 X：0.0f，Y：1.0f ，四边形的左上顶点是 X： -1.0f，Y：1.0f 。其余三点依此类推。

试着玩玩 glTexCoord2f 的X，Y坐标参数。把 1.0f 改为 0.5f 将只显示纹理的左半部分，把 0.0f 改为 0.5f 将只显示纹理的右半部分。

```c
    glBegin(GL_QUADS);
    // 前面
    glTexCoord2f(0.0f, 0.0f); glVertex3f(-1.0f, -1.0f, 1.0f); // 纹理和四边形的左下
    glTexCoord2f(1.0f, 0.0f); glVertex3f( 1.0f, -1.0f, 1.0f); // 纹理和四边形的右下
    glTexCoord2f(1.0f, 1.0f); glVertex3f( 1.0f, 1.0f, 1.0f); // 纹理和四边形的右上
    glTexCoord2f(0.0f, 1.0f); glVertex3f(-1.0f, 1.0f, 1.0f); // 纹理和四边形的左上
    // 后面
    glTexCoord2f(1.0f, 0.0f); glVertex3f(-1.0f, -1.0f, -1.0f); // 纹理和四边形的右下
    glTexCoord2f(1.0f, 1.0f); glVertex3f(-1.0f, 1.0f, -1.0f); // 纹理和四边形的右上
    glTexCoord2f(0.0f, 1.0f); glVertex3f( 1.0f, 1.0f, -1.0f); // 纹理和四边形的左上
    glTexCoord2f(0.0f, 0.0f); glVertex3f( 1.0f, -1.0f, -1.0f); // 纹理和四边形的左下
    // 顶面
    glTexCoord2f(0.0f, 1.0f); glVertex3f(-1.0f, 1.0f, -1.0f); // 纹理和四边形的左上
    glTexCoord2f(0.0f, 0.0f); glVertex3f(-1.0f, 1.0f, 1.0f); // 纹理和四边形的左下
    glTexCoord2f(1.0f, 0.0f); glVertex3f( 1.0f, 1.0f, 1.0f); // 纹理和四边形的右下
    glTexCoord2f(1.0f, 1.0f); glVertex3f( 1.0f, 1.0f, -1.0f); // 纹理和四边形的右上
    // 底面
    glTexCoord2f(1.0f, 1.0f); glVertex3f(-1.0f, -1.0f, -1.0f); // 纹理和四边形的右上
    glTexCoord2f(0.0f, 1.0f); glVertex3f( 1.0f, -1.0f, -1.0f); // 纹理和四边形的左上
    glTexCoord2f(0.0f, 0.0f); glVertex3f( 1.0f, -1.0f, 1.0f); // 纹理和四边形的左下
    glTexCoord2f(1.0f, 0.0f); glVertex3f(-1.0f, -1.0f, 1.0f); // 纹理和四边形的右下
    // 右面
    glTexCoord2f(1.0f, 0.0f); glVertex3f( 1.0f, -1.0f, -1.0f); // 纹理和四边形的右下
    glTexCoord2f(1.0f, 1.0f); glVertex3f( 1.0f, 1.0f, -1.0f); // 纹理和四边形的右上
    glTexCoord2f(0.0f, 1.0f); glVertex3f( 1.0f, 1.0f, 1.0f); // 纹理和四边形的左上
    glTexCoord2f(0.0f, 0.0f); glVertex3f( 1.0f, -1.0f, 1.0f); // 纹理和四边形的左下
    // 左面
    glTexCoord2f(0.0f, 0.0f); glVertex3f(-1.0f, -1.0f, -1.0f); // 纹理和四边形的左下
    glTexCoord2f(1.0f, 0.0f); glVertex3f(-1.0f, -1.0f, 1.0f); // 纹理和四边形的右下
    glTexCoord2f(1.0f, 1.0f); glVertex3f(-1.0f, 1.0f, 1.0f); // 纹理和四边形的右上
    glTexCoord2f(0.0f, 1.0f); glVertex3f(-1.0f, 1.0f, -1.0f); // 纹理和四边形的左上
    glEnd();
```

现在增加 xrot , yrot 和 zrot 的值。尝试变化每次各变量的改变值来调节立方体的旋转速度，或改变+/-号来调节立方体的旋转方向。 

```c
    xrot+=0.3f;    // X 轴旋转
    yrot+=0.2f;    // Y 轴旋转
    zrot+=0.4f;    // Z 轴旋转
    return true;    // 继续运行
}
```


现在您应该比较好的理解纹理映射(贴图)了。您应该掌握了给任意四边形表面贴上您所喜爱的图像的技术。一旦您对2D纹理映射的理解感到自信的时候，试试给立方体的六个面贴上不同的纹理。
当您理解纹理坐标的概念后，纹理映射并不难理解。！如果您有什么意见或建议请给我EMAIL。如果您认为有什么不对或可以改进，请告诉我。