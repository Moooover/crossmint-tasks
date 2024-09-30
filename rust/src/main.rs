use reqwest::Error;
use tokio::time::{sleep, Duration};

pub mod constants;
pub mod types;
use crate::types::*;

#[tokio::main]
async fn main() -> Result<(), Error> {
    let g_map = GoalMap::get_goal_map().await?;
    let is_remove = false;

    if is_remove {
        for (row_no, row_value) in g_map.goal.iter().enumerate() {
            for (col_no, col_value) in row_value.iter().enumerate() {
                // Polyanet::remove(row_no as u64, col_no as u64).await?;
                if col_value == "POLYANET" {
                    Polyanet::remove(row_no as u64, col_no as u64).await?;
                    sleep(Duration::from_millis(1000)).await;
                }
                if col_value.contains("COMETH") {
                    Cometh::remove(row_no as u64, col_no as u64).await?;
                    sleep(Duration::from_millis(1000)).await;
                }
                if col_value.contains("SOLOON") {
                    Soloon::remove(row_no as u64, col_no as u64).await?;
                    sleep(Duration::from_millis(1000)).await;
                }
            }
        }
    } else {
        for (row_no, row_value) in g_map.goal.iter().enumerate() {
            for (col_no, col_value) in row_value.iter().enumerate() {
                // Polyanet::remove(row_no as u64, col_no as u64).await?;
                if col_value == "POLYANET" {
                    Polyanet::create(Polyanet {
                        row: row_no as u64,
                        column: col_no as u64,
                    })
                    .await?;
                    sleep(Duration::from_millis(1000)).await;
                }
                if col_value.contains("COMETH") {
                    let dir: Vec<&str> = col_value.split('_').collect();
                    Cometh::create(Cometh {
                        row: row_no as u64,
                        column: col_no as u64,
                        direction: dir[0].trim().to_lowercase(),
                    })
                    .await?;
                    sleep(Duration::from_millis(1000)).await;
                }
                if col_value.contains("SOLOON") {
                    let color: Vec<&str> = col_value.split('_').collect();
                    Soloon::create(Soloon {
                        row: row_no as u64,
                        column: col_no as u64,
                        color: color[0].trim().to_lowercase(),
                    })
                    .await?;
                    sleep(Duration::from_millis(1000)).await;
                }
            }
        }
    }

    Ok(())
}
