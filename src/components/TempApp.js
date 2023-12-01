import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
const TempApp = () => {
  function generateRandomColor() {
    var letters = 'BCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * letters.length)];
    }
    return color;
  }

  const changetheme = () => {
    var randomColor = generateRandomColor();
    var element = document.body;
    element.classList.toggle("dark-mode");
    var v = document.getElementsByClassName("wave");
    var vt = document.getElementsByClassName("wave -two");

    v[0].style.backgroundColor = randomColor;
    vt[1].style.backgroundColor = randomColor;
    //  if(flag==0){
    //   v[0].style.backgroundColor="darkorange"; 
    //   vt[0].style.backgroundColor="darkorange";
    //   flag=1;
    //  }
    //  else{
    //    flag=0;
    //   v[0].style.backgroundColor="white"; 
    //   vt[0].style.backgroundColor="white";
    //  }
    /*
    var x = document.getElementById("theme");
    if (x.style.backgroundColor === "orange") {
      x.style.backgroundColor = "white";
    } else {
      x.style.backgroundColor= "orange";
    }*/
  }
  var flag = 0;
  const [city, setCity] = useState(null);
  const [sky, setSky] = useState(null);
  const [ico, setIco] = useState(null);
  const [search, setSearch] = useState("");
  const [clothes, setClothes] = useState(["T-Shirts,Cotton Dresses,Skirts,Caps", "Beanie, Cardigan, Earmuffs,Jacket,Long Coat,Mittens", "It is raining or probably would rain,wear a raincoat or take an umbrella."]);
  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=7a9c44c66cb7672e90d095e3406f03e7`
      )
      .then((response) => {
        console.log(response);
        setCity(response.data.main);
        setSky(response.data.weather[0].description);
        setIco(response.data.weather[0].icon);
      })
      .catch((error) => {
        setCity(null);
        // console.log(error);
      });
  }, [search]);
  return (
    <>
      <div className="checkkk">
        <div className="top"><h1>WEATHER REPORT</h1> <br /></div>
        <div><button onClick={changetheme} id="theme"><i class="fa fa-sun"></i></button></div>
      </div>
      <div className="box" id="boxid">
        <div className="inputData">
          <input id="tipu" spellCheck="false" onChange={(event) => {
            setSearch(event.target.value)
          }} value={search} type="search" className="inputField" />
        </div>
        {!city ? (<p className="errorMsg">Wrong City!! No Data Found</p>) : (
          <div><div className="info">
            <div className="content">
              <h2 className="location">
                <i className="fas fa-street-view"></i>
                {search}
              </h2>
              <h1 className="temp">
                {city.temp} °Cel

              </h1>


              <h3 className="tempmin_max">
                Min : {city.temp_min}°Cel | Max : {city.temp_max}°Cel
              </h3>

              <h1>{sky}</h1>

              {city.temp_max >= 18 ?
                <>{city.temp_max >= 27 ?
                  <><i class="fa fa-clouds-sun"></i>
                    <h2 className="">It is summer season.Wear{clothes[0]} </h2></>
                  : <><i class="fa fa-hat-winter"></i>
                    <h2 className="">It is winter season.Wear{clothes[1]} </h2>
                  </>
                }</>
                : <>{city.temp_max < 18 ?
                  <><i class="fa fa-clouds-sun"></i>
                    <h2 className="">It is cold winter season.Wear{clothes[1]} </h2></>
                  : <><i class="fa fa-hat-winter"></i>
                    <h2 className="">It is rainy season.Wear{clothes[2]} </h2>
                  </>
                }</>
              }
            </div>
          </div>
            <div id="wavey1" className="wave -one"></div>
            <div id="wayey2" className="wave -two"></div>
            <div id="wavey3" className="wave -three"></div>
          </div>
        )}


      </div>
    </>
  )
}

export default TempApp;