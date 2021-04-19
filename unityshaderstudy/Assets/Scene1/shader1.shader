Shader "Custom/Shader1"
{
    Properties
    {
        _Color("Main Color", Color) = (1, 1, 1, 0.5) // 主颜色值
        _SpecColor("Sec Color", Color) = (1, 1, 1, 1) // 高光颜色
        _Emission("Emission Color", Color) = (0, 0, 0, 0) // 自发光颜色
        _Shininess("Shininess", Range(0.01, 1)) = 0.7 // 高光系数
        _MainTex("Base(RGB)", 2D) = "white" {} // 主纹理
    }
    SubShader
    {
        // 没有特别需求Tags可省略
        Pass
        {
            Material
            {
                Diffuse[_Color] // 漫反射
                Ambient[_Color] // 环境光
                Shininess[_Shininess] // 高光系数
                Specular[_SpecColor] // 镜面高光
                Emission[_Emission] // 自发光
            }
            Lighting On // 打开光照
            SeparateSpecular On // 允许高光使用一个不同于主颜色的颜色
            SetTexture[_MainTex] // 处理纹理属性
            {
                constantColor[_Color] // 定义定点默认使用的常量颜色值
                Combine texture*primary DOUBLE,texture*constant // 计算最终颜色和透明度
            }
        }
    }
    // 降级着色器
    Fallback "Diffuse"
}