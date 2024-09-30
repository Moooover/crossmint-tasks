use crate::constants::{API_ENDPOINT, CANDIDATE_ID};
use reqwest::{header::CONTENT_TYPE, Error};
use serde::{Deserialize, Serialize};
use serde_json::{ json, Value };

pub trait Entity {
    fn endpoint() -> &'static str;

    fn create(data: Self) -> impl std::future::Future<Output = Result<(), Error>> + Send 
        where Self: Sized + Serialize + Send
    {
        async move {
            // insert `candidateId` to the object
            let mut json_value = serde_json::to_value(&data).unwrap();
            if let Some(obj) = json_value.as_object_mut() {
                obj.insert("candidateId".to_string(), Value::String(CANDIDATE_ID.into()));
            }

            // println!("JSON obj {}", json_value);

            let client = reqwest::Client::new();
            let response = client
                .post(format!("{}{}", API_ENDPOINT, Self::endpoint()))
                .header(CONTENT_TYPE, "application/json")
                .json(&json_value)
                .send()
                .await?;

            println!("Status: {}", response.status());
            let body = response.text().await?;
            println!("body {}", body);

            Ok(())
        }
    }

    fn remove(row: u64, column: u64) -> impl std::future::Future<Output = Result<(), Error>> + Send {
        async move {
            let client = reqwest::Client::new();
            let response = client
                .delete(format!("{}{}", API_ENDPOINT, Self::endpoint()))
                .json(&json!({
                    "row": row,
                    "column": column,
                    "candidateId": CANDIDATE_ID
                }))
                .send()
                .await?;

            println!("Status: {}", response.status());
            let body = response.text().await?;
            println!("body {}", body);

            Ok(())
    }}
}

#[derive(Serialize, Clone)]
pub struct Polyanet {
    pub row: u64,
    pub column: u64
}

impl Entity for Polyanet {
    fn endpoint() -> &'static str {
        "polyanets"
    }
}

#[derive(Serialize, Clone)]
pub struct Cometh {
    pub row: u64,
    pub column: u64,
    pub direction: String
}

impl Entity for Cometh {
    fn endpoint() -> &'static str {
        "comeths"
    }
}

#[derive(Serialize, Clone)]
pub struct Soloon {
    pub row: u64,
    pub column: u64,
    pub color: String
}

impl Entity for Soloon {
    fn endpoint() -> &'static str {
        "soloons"
    }
}
#[derive(Deserialize, Debug)]
pub struct GoalMap {
    pub goal: Vec<Vec<String>>,
}

impl GoalMap {
    pub async fn get_goal_map() -> Result<Self, Error> {
        let response = reqwest::get(format!("{}map/{}/goal", API_ENDPOINT, CANDIDATE_ID)).await?;
        let g_map: GoalMap = response.json().await?;
        Ok(g_map)
    }
}
