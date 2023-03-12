from flask import Flask, render_template, request, redirect, jsonify, url_for
import json
from sklearn.preprocessing import StandardScaler, MinMaxScaler
from sklearn.decomposition import PCA
from sklearn.cluster import KMeans
import numpy as np
import pandas as pd
import math
import pprint

data = pd.read_csv('PC_Games_encoded_final.csv')
data.drop(columns="Name", axis = 1, inplace=True)

cols = data.columns.tolist()

features = data.columns

stdScaler = StandardScaler().fit_transform(data)
num_clusters = 4

pca = PCA(n_components=(len(features)))
principalComponents = pca.fit_transform(stdScaler)

min_max_scaler = MinMaxScaler(feature_range=(-1,1))
norm_principalComponentsData = min_max_scaler.fit_transform(X= principalComponents)

eigen_values = pca.explained_variance_

li = []
for feature in features:
    li.append(feature)
    
PCA_components = principalComponents
inertias = []
for k in range(1, 16):
    model = KMeans(n_clusters=k)
    model.fit(PCA_components)
    inertias.append(model.inertia_)
    
def elbow():
    elbow_dict = {}
    for i in range(len(inertias)):
        elbow_dict[i+1] = inertias[i]
        
    elbow_dict = {'inertia': elbow_dict}
    print(elbow_dict)
    return elbow_dict

elbow()

def generateScreeData():
    scree_plot = {}
    eigen_total = sum(eigen_values)
    variance_percentage = []
    for i in eigen_values:
        perc = (i/eigen_total)*100
        variance_percentage.append(perc)
    
    print("Variance percentage after eigen vals: ", variance_percentage)    
    cum_variance = [] #cumulative variance
    temp = 0
    for i in variance_percentage:
        temp += i
        print("Temp value: ", temp)
        cum_variance.append(temp)
        print("Cumulative variance in iteration: ", cum_variance)
        
    for i in range(0, len(eigen_values)):
        scree_plot[i+1] = {"variance_percentage": variance_percentage[i], "cum_variance": cum_variance[i]}
        
    return scree_plot

def getTopPCA():
    feature_contr = {}
    count = 0
    
    for i, j, k in zip(li, pca.components_[0], pca.components_[1]):
        feature_contr[count] = {}
        feature_contr[count]["name"] = i
        feature_contr[count]["pc1"] = j
        feature_contr[count]["pc2"] = k
        count += 1
        
    top_pca = norm_principalComponentsData[:, :2]
    plot_pca = {}
    for i in range(0, len(top_pca)):
        plot_pca[i] = {}
        plot_pca[i]['pc1'] = top_pca[i, 0]
        plot_pca[i]['pc2'] = top_pca[i, 1]
        
    return feature_contr, plot_pca

def getTopFourFeatures(di = 3):
    squaredValue = pca.components_[:di] ** 2
    
    featureDict = {}
    for i in range(0, len(squaredValue[0])):
        total = 0
        for j in range(0, len(squaredValue)):
            total += squaredValue[j][i]
        featureDict[li[i]] = total
        
    sortedFeatureDict = [k for k, v in sorted(featureDict.items(), key = lambda item: item[1])]
    sortedFeatureDict = sortedFeatureDict[::-1]
    bestFourFeatures = sortedFeatureDict[:4]
    
    valueBestFourFeatures = {}
    for i in bestFourFeatures:
        valueBestFourFeatures[i] = featureDict[i]
        
    return valueBestFourFeatures

def getTopFourScatterData(di = 4):
    impFeatures = getTopFourFeatures(di)
    impFeatureArray = [i for i in impFeatures]
    np_data = data[impFeatureArray].values
    
    clusterFeatures = [i for i in impFeatures]
    featureData = data[clusterFeatures]
    kmeans = KMeans(n_clusters=4, random_state=0, n_init=10).fit(np_data)
    
    sendData = {}
    for i in range(0, np_data.shape[0]):
        sendData[i] = {}
        for j in range(0, len(impFeatureArray)):
            sendData[i][impFeatureArray[j]] = np_data[i][j]
        sendData[i]['label'] = int(kmeans.labels_[i])
    
    return sendData
        
#######################################################################

app = Flask(__name__, template_folder='templates')


@app.route("/")

def index():
    return render_template("first_page.html") 

@app.route("/index_page")
def index_page():
    return render_template("index_page.html")
    
@app.route("/init_home", methods=["POST", "GET"])

def init_home():
    if request.method == "POST":
        data = {'chart-data':"fool"}
        return data
    else:
        print("ERROR")
        
@app.route("/screeplot", methods=["POST", "GET"])

def id_index():
    if request.method =="POST":
        raw_data = generateScreeData()
        data = {'chart_data': raw_data}
        print(data)
        return (data)
    else:
        print("ERROR")
        
@app.route("/id_index", methods=["POST", "GET"])

def screePlot():
    if request.method == "POST":
        data_back = request.form['data']
        print(data_back)
        fourFeatures = getTopFourFeatures(int(data_back))
        newFourFeatures = dict(sorted(fourFeatures.items(), key = lambda item: item[1], reverse = True))
        chart_data = getTopFourScatterData(int(data_back))
        data = {'feature_data': newFourFeatures, 'chart_data': chart_data}
        
        print("abb")
        return data
    else:
        print("ERROR")
        
@app.route("/biplot", methods=["POST", "GET"])

def callBiplot():
    if request.method == "POST":
        feature_contr, plot_pca = getTopPCA()
        data = {'feature_contr': feature_contr, 'plot_pca': plot_pca}
        return jsonify(data)
    else:
        print("ERROR")
        
@app.route("/elbow", methods=["POST", "GET"])

def callElbow():
    if request.method == "POST":
        elbow_data = elbow()
        print(elbow_data)
        return jsonify(elbow_data)
    else:
        print("ERROR")
        
if __name__ == "__main__":
    app.run(debug=True)