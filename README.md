**CSE 564: Visualization(Spring 2023) as Basic Project CSE 522**

**Assignment 2a Report**

**About Dataset:**

The dataset I used for this assignment(same as assignment 1) consists of data pertaining to the requirements for a PC/Video game to function on Computer. The reason for using this dataset is because nowadays numerous high-end games are being developed and many remastered versions of older games are released. Hence this dataset contains information on what would be the optimal requirements(hardware specs) for smoothly running a particular game on a given system.

The dataset was obtained from Kaggle.

Link: [https://www.kaggle.com/datasets/baraazaid/pc-video-game-requirements-v2](https://www.kaggle.com/datasets/baraazaid/pc-video-game-requirements-v2)

Number of columns in the actual dataset: 90

Number of records in the actual dataset: 10843

I've selected 1000 random records from the original dataset and 16 columns from the original dataset.

Column Names(categoricals encoded):

1. **Min\_OS(encoded):** Required Operating System for the game to run
2. **Recom\_OS(encoded):** Recommended Operating Operating System for the game
3. **Min\_Direct\_X(encoded):** Required Direct X setup version(important for running high-end games)
4. **Min\_HDD\_Space(encoded):** Required Hard Disk space since most games are nowadays have disk size \>= 100GB
5. **Recom\_CPU\_Max\_Temp:** Recommended CPU operating temperature to achieve optimal gaming performance(typically around 40 - 80 degree celsius)
6. **Recom\_HDD\_Space(encoded):** Recommended Hard Disk Space(useful for cost effectiveness)
7. **Min\_CPU\_Lithography:** Required CPU Lithography describes the distance between transistors embedded on the CPU (the lower the value(in nm), the better the CPU)
8. **Min\_CPU\_Physical\_Cores:** Number of required cores in CPU(more cores means higher performance)
9. **Recom\_CPU\_CPU\_Speed:** CPU performance speed(in GHz) crucial for running high end games
10. **Recom\_CPU\_Lithography:** Recommended CPU Lithography(usually lower than required)
11. **Min\_GPU\_Memory:** Required GPU VRAM memory(for achieving higher texture and frame processing)
12. **Min\_GPU\_Memory\_Speed:** Required VRAM processing speed for faster processing of pixels, textures and frames
13. **Min\_GPU\_Pixel\_Rate:** Required rate for processing a certain number of pixels per second
14. **Min\_GPU\_Texture\_Rate:** Required texture rate(used for texture filtering) in GigaTexels/second
15. **Min\_GPU\_Memory\_Bandwidth:** Required GPU bandwidth(higher value implies faster transfer of processed components such as pixels, textures and frames) in Gb/s.
16. **Min\_GPU\_Direct\_X:** Required Direct X setup for GPU.

**Tasks: Visualization tools in visual analytics**

Front page dashboard:

The image below shows the front page of the visual interface. This is done using bootstrap

![image](https://user-images.githubusercontent.com/125203016/224568624-aacb9246-8437-400b-823e-14ad07accde1.png)

Menu Page:

The image below shows the menu page which gets loaded on clicking the "Dashboard" button in the previous page. This page displays the attributes that are used for the PCA analysis.

![image](https://user-images.githubusercontent.com/125203016/224568643-b60b6776-02f2-4963-b07d-f79f0d4132da.png)


1. Basic dimension reduction and visualization using PCA:

In this task the PCA based scree plot is displayed in which the user can interact with the bars on the graph and select the required dimensionality indices i.e number of bars selected will set the index number and the biplot can be viewed as well. On moving the mouse cursor on the scree plot bar or the biplot attributes, we can view the percentage variance and the contribution of the attribute towards the principal components respectively

![image](https://user-images.githubusercontent.com/125203016/224568676-50249e56-29ce-4443-9236-2dbd98078ce6.png)

![image](https://user-images.githubusercontent.com/125203016/224568686-4f57256d-0cc4-4661-a5fc-160f2b4e48f5.png)

\*\* webpage zoomed out to avoid scrolling \*\*

1. Data visualization using scatter plot matrix:

In this task, the intrinsic dimensionality index selected in the scree plot will display the feature table containing the top 4 features and their sum of squared loading values. A scatter plot matrix representing these 4 attributes with their unique coloured clusters on the basis of k means will be displayed.

![image](https://user-images.githubusercontent.com/125203016/224568704-765d9ad1-82ce-4368-8c69-6cc0c21e76ff.png)

1. In this task the elbow plot describing the optimal value of k is displayed.

![image](https://user-images.githubusercontent.com/125203016/224568711-c27813b9-e8d9-4cc4-b562-7337c288c937.png)
