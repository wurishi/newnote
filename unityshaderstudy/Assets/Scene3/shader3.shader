Shader "Custom/Shader3"
{
    Properties
    {
        _Color("Main Color", Color) = (1, 1, 1, 1) // 主颜色
        _MainTex("Albedo(RGB)", 2D) = "White"{} // 主纹理
        _CutOff("Alpha CutOff", Range(0, 1)) = 0.0 // 动态调节 Alpha 阈值
    }
    SubShader
    {
        // 使用 Alpha 测试队列
        Tags{"Queue" = "AlphaTest"}
        // 渲染通道
        Pass
        {
            // 指定材质信息
            Material
            {
                Diffuse[_Color]
                Ambient[_Color]
            }
            // 启用 Alpha 测试功能, 使用 AlphaTest 指令
            AlphaTest GEqual[_CutOff] // GEqual 是 Greater Or Equal, 即大于等于 Alpha 阈值
            // 开启光照
            Lighting On
            // 纹理设置指令
            SetTexture[_MainTex]
            {
                constantColor[_Color]
                Combine texture*primary DOUBLE, texture*constant
            }
        }
    }
    FallBack "Diffuse"
}