<template>
    <div class="Homepage">
        <h1 class="title">Pet Economy</h1>
        <div class="row">
            <div class="col-md-3">
                <div class="home-stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Pet ownership</div>
                        <span class="stat-icon">🏠</span>
                    </div>
                    <div class="stat-number">90.5M</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="home-stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Shelter Animal Trend</div>
                        <span class="stat-icon">📈</span>
                    </div>
                    <div class="stat-number" style="color:green">&darr; 594,042</div>
                </div>
            </div>

            <div class="col-md-3">
                <div class="home-stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Pet Market Sale</div>
                        <span class="stat-icon">🛒</span>
                    </div>
                    <div class="stat-number">$143.6B</div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="home-stat-card">
                    <div class="d-flex justify-content-between">
                        <div class="stat-title">Animal Caretaker Peak</div>
                        <span class="stat-icon">🐾</span>
                    </div>
                    <div class="stat-number">121,000</div>
                </div>
            </div>
        </div>

        <br>

        <div style="height: fit-content;">
            <div class="stat-card" style="max-height: 100%;">
                <div class="row">
                    <div class="col-sm-4">
                        <h6>States with the largest net outcome of sheltered animals</h6>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>Texas</td>
                                    <td style="color:green">&darr; 119721</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>California</td>
                                    <td style="color:green">&darr; 109209</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Arizona</td>
                                    <td style="color:green">&darr; 66770</td>
                                </tr>
                            </tbody>
                        </table>
                        <br>
                        <br>
                        <h6>States with the largest net intake of sheltered animals</h6>
                        <table class="table">
                            <tbody>
                                <tr>
                                    <th scope="row">1</th>
                                    <td>New York</td>
                                    <td style="color:red">&uarr; 10807</td>
                                </tr>
                                <tr>
                                    <th scope="row">2</th>
                                    <td>Washington</td>
                                    <td style="color:red">&uarr; 10346</td>
                                </tr>
                                <tr>
                                    <th scope="row">3</th>
                                    <td>Minnesota</td>
                                    <td style="color:red">&uarr; 1894</td>
                                </tr>
                            </tbody>
                        </table>


                    </div>
                    <div class="col-sm-8">
                        <img src="../assets/Annual change-All-2022.png" width="100%">
                    </div>
                </div>
            </div>
        </div>

        <div style="max-height: fit-content;">
            <div class="stat-card" style="margin-top: 20px;">
                <div class="row">
                    <div class="description">
                        <h5>Description:</h5>
                        <text>
                        This Dashboard explores the multifaceted pet economy with a focus on cats and dogs in the United States. We examine the trends and dynamics of pet ownership, analyzing how demographic and economic factors influence the rising number of cat and dog owners. A significant portion of the study is dedicated to understanding the flow of animals into and out of shelters.
                        
                        </text>
                    </div>
                    
                    <div class="group" style="margin-top: 10px;">
                        <h5>Group Members:</h5>
                        <text>
                            Gonglin Chen, Chuqiao Wang, Joanna Xiao, and Rui Xue
                        </text>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style>
body{
    width: 100%;
    margin: 0;
    overflow-y: scroll;
}

.title {
    text-align: center;
    font-family: "Arial", sans-serif;
    font-size: 24px;
    color: #333;
    margin-top: 30px;
    margin-bottom: 20px;
    font-weight: bold;
    text-shadow: 2px 2px 4px rgba(134, 130, 130, 0.5);
}

.container {
    height: 100%;
    width: 100vh;
}

.card-title {
    text-align: center;
}

.card-text {
    text-align: center;
    font-size: 2em;
    font-weight: bold;
}

.mt-4 {
    height: 80%;
}

.tooltip {
    position: absolute;
    background-color: #fff;
    border: 1px solid #ccc;
    padding: 10px;
    font-size: 12px;
    pointer-events: none;
}

.country-text {
    font-size: 1.2em;
}


.stat-card {
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border-radius: 10px;
    padding: 20px;
    font-size: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*align-items: flex;*/
}

.stat-title {
    font-size: 24px;
    margin-bottom: 5px;
}

.stat-icon {
    font-size: 26px;
    margin-left: 20px;
}

.stat-number {
    font-size: 36px;
    font-weight: bold;
    margin-top: 5px;
}

.home-stat-card {
    width: 100%;
    height: 100%;
    background-color: #ffffff;
    color: rgb(0, 0, 0);
    border-radius: 10px;
    padding: 20px;
    font-size: 16px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    justify-content: center;
    /*align-items: flex;*/
}
</style>