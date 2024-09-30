use reqwest::Error;
use tokio::time::{sleep, Duration};

pub mod constants;
pub mod types;

use crate::types::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let g_map = GoalMap::get_goal_map().await?;
    for (row_no, row_value) in g_map.goal.iter().enumerate() {
        for (col_no, col_value) in row_value.iter().enumerate() {
            //Polyanet::remove(row_no as u64, col_no as u64).await?;
            if col_value == "POLYANET" {
                // Polyanet::create(row_no as u64, col_no as u64).await?;
                // sleep(Duration::from_secs(1)).await;
            }
        }
    }

    Ok(())
}
