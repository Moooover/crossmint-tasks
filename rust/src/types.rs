use reqwest::Error;
use serde_json::{ json };
use serde::{Deserialize, Serialize};
use crate::constants::{ API_ENDPOINT, CANDIATE_ID};

pub struct Polyanet {}

impl Polyanet {
    pub async fn create(row: u64, column: u64) -> Result<(), Error> {
        //let params = [("row", row), ("column", column)];
        let client = reqwest::Client::new();
        let response = client.post(format!("{}polyanets", API_ENDPOINT)).json(&json!({
            "row": row,
            "column": column,
            "candidateId": CANDIATE_ID
        })).send().await?;

        println!("Status: {}", response.status());

        let body = response.text().await?;
        println!("body {}", body);
        
        Ok(())
    }

    pub async fn remove(row: u64, column: u64) -> Result<(), Error> {
        let client = reqwest::Client::new();
        let response = client.delete(format!("{}polyanets", API_ENDPOINT)).json(&json!({
            "row": row,
            "column": column,
            "candidateId": CANDIATE_ID
        })).send().await?;

        println!("Status: {}", response.status());

        let body = response.text().await?;
        println!("body {}", body);
        
        Ok(())
    }
}

#[derive(Deserialize, Debug)]
pub struct GoalMap {
    pub goal: Vec<Vec<String>>
}

impl GoalMap {
    pub async fn get_goal_map() -> Result<Self, Error> {
        let response = reqwest::get(format!("{}map/{}/goal", API_ENDPOINT, CANDIATE_ID)).await?;
        println!("Status: {}", response.status());

        let g_map: GoalMap  = response.json().await?;
        println!("body: {:?}", g_map);

        Ok(g_map)
    }
}
