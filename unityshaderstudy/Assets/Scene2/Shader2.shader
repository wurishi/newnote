Shader "Custom/Shader2"
{
    Properties
    {
        _Color("Color", Color) = (1, 1, 1, 1) // 设置主颜色
        _MainTex("Albedo(RGB)", 2D) = "white"{} // 设置主纹理
    }
    SubShader
    {
        // 使用透明队列渲染标签
        Tags{"Queue" = "Transparent"}
        Pass
        {
            // 定义材质
            Material
            {
                Diffuse[_Color] // 漫反射
                Ambient[_Color] // 环境光
            }
            // 使用 Alpha 混合功能必须要预先开启, 使用 Blend 指令
            Blend SrcAlpha OneMinusSrcAlpha
            // 开启标准顶点光照
            Lighting On
            // 纹理设置
            SetTexture[_MainTex]
            {
                constantColor[_Color]
                Combine texture*primary DOUBLE, texture*constant
            }
        }
    }
    Fallback "Diffuse"
}