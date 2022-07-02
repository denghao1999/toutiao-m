// 封装本地存储操作模块

//  存储数据
export const setItem = (key, value) => {
  // 将数组。对象类型的数据转化成 JSON格式的字符串
  if (typeof value === "object") {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};

// 获取数据

export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
};

// 删除数据,删除一个
export const removeItem = (key) => {
  window.localStorage.removeItem(key);
};


// 删除所有的本地存储数据
export const clearItem = ()=>{
  window.localStorage.clearItem()
}
