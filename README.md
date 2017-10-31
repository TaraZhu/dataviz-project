## New York City Leading Causes of Death

This visualization is about the leading causes of death by gender and ethnicity in New York City from 2007 to 2014. 

这里介绍一下数据集吼。

以及，我们在左边只选择了top 5的cause是一来是这5个原因死人最多，二来因为这5个cause的数据很完整。其他的疾病或者意外死因很多都缺失某些种族或者性别的数据。

BTW，这5个cause里有一个叫做“All Other Causes”，乍一看是除了另外四个之外所有能死人的原因都在这里了，但其实并不是... 只是原来那个完整的集里面，就有个cause叫All Other Causes... **其实是应该再filter一下数据集把其他的都加进这个里，然而我比较偷懒...**

### Technical difficulties

这部分有两个有点难的地方：

- Add toggle function to multi-series line chart.

最开始我们设计的是鼠标悬停到line或者text上的时候也有高亮（就像interactive作业里面那种），点击line或者text之后右边的条形图update。但实现的时候因为D3把CSS的hover（悬停）拆分成了mousein（鼠标移入） 和mouseout（鼠标移出）两个事件，所以即使每次点击触发onclick事件的function高亮了选中的line和text，之后只要移动鼠标，就会因为触发mouseout事件而再把样式变回default。当前的解决方式是click就不改变样式...

- Switch subset for bar chart update.

另一个point：现在每次选择别的cause之前，都要先click已经选中了的cause把选中消掉，但最user friendly的设计肯定是直接点击新的cause就好，右边bar chart的数据需要dynamic的绑定和解绑。我们现在另一个很鸡贼（a.k.a不规范）的做法是把所有右边bar chart要用到的数据保存在了一个JavaScript变量中（那个src文件夹下的detailsData.js就只保存了这个Array(Object)变量），但（maybe）更规范的做法是用json/csv function加载。

**以上两个点也可以解决，again，我比较偷懒...**

其他一些：

保持宽高比缩放用的纯CSS “preserveAspectRatio”。右边更新bar chart的时候没用那个什么general update pattern，直接remove()了重画的，省事嘛。

### Function to be added

鼠标悬停到后边bar的bar上，显示相应Cause/Gender/Race的Death Rate和Age Adjusted Death Rate。

↑↑↑ 我们后面要是有时间，就回来把上面的改一改加一加。