#!/usr/bin/env python3
"""
Comprehensive API Testing Script for Flask Backend

This script tests all three API endpoints implemented in the Flask backend:
1. GET /api/getMenu - Returns navigation menu items
2. GET /api/rules/us_population_data - Returns US population data
3. GET /api/rules/about - Returns database content with timestamp

Usage:
    python test_api.py

Prerequisites:
    - Flask backend must be running on the specified port
    - Database must be initialized with sample data
"""

import requests
import json
import sys
from datetime import datetime

# Configuration
BASE_URL = "http://localhost:5001"  # Updated to match Flask app port
TIMEOUT = 10  # Request timeout in seconds

def test_get_menu():
    """
    Test the /api/getMenu endpoint
    
    Expected Response:
    - Status: 200 OK
    - Content: JSON array with 3 menu items (table, chart, about)
    - Each item should have: id, name, label fields
    """
    try:
        print("🧪 Testing GET /api/getMenu...")
        response = requests.get(f"{BASE_URL}/api/getMenu", timeout=TIMEOUT)
        
        print(f"📊 Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Found {len(data)} menu items:")
            for item in data:
                print(f"   - {item.get('label', 'Unknown')} (id: {item.get('id')}, name: {item.get('name')})")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
        print("-" * 60)
        return response.status_code == 200
        
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Flask backend is not running or not accessible")
        print("   Make sure to start the Flask app with: python app.py")
        print("-" * 60)
        return False
    except requests.exceptions.Timeout:
        print("❌ Timeout Error: Request took too long to complete")
        print("-" * 60)
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        print("-" * 60)
        return False

def test_us_population_data():
    """
    Test the /api/rules/us_population_data endpoint
    
    Expected Response:
    - Status: 200 OK
    - Content: JSON array of US population data
    - Each item should have: year, population fields
    - Data should be fetched from external GitHub source
    """
    try:
        print("🧪 Testing GET /api/rules/us_population_data...")
        response = requests.get(f"{BASE_URL}/api/rules/us_population_data", timeout=TIMEOUT)
        
        print(f"📊 Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            if isinstance(data, list) and len(data) > 0:
                print(f"✅ Success! Retrieved {len(data)} population records")
                print(f"📈 Sample data:")
                for i, item in enumerate(data[:3]):  # Show first 3 items
                    print(f"   {i+1}. Year: {item.get('year')}, Population: {item.get('population'):,}")
                if len(data) > 3:
                    print(f"   ... and {len(data) - 3} more records")
            else:
                print(f"⚠️  Warning: Unexpected data format")
                print(f"Response: {json.dumps(data, indent=2)}")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
        print("-" * 60)
        return response.status_code == 200
        
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Flask backend is not running or not accessible")
        print("-" * 60)
        return False
    except requests.exceptions.Timeout:
        print("❌ Timeout Error: Request took too long to complete")
        print("-" * 60)
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        print("-" * 60)
        return False

def test_about():
    """
    Test the /api/rules/about endpoint
    
    Expected Response:
    - Status: 200 OK
    - Content: JSON object with content and last_update fields
    - content: Lorem ipsum text from database
    - last_update: Current timestamp
    """
    try:
        print("🧪 Testing GET /api/rules/about...")
        response = requests.get(f"{BASE_URL}/api/rules/about", timeout=TIMEOUT)
        
        print(f"📊 Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"✅ Success! Retrieved about content:")
            print(f"📝 Content length: {len(data.get('content', ''))} characters")
            print(f"🕒 Last update: {data.get('last_update', 'N/A')}")
            
            # Show first 100 characters of content
            content_preview = data.get('content', '')[:100]
            if len(data.get('content', '')) > 100:
                content_preview += "..."
            print(f"📄 Content preview: {content_preview}")
            
        elif response.status_code == 404:
            print("❌ Error: No content found in database")
            print("   Run 'python init_db.py' to initialize the database")
        else:
            print(f"❌ Error: {response.status_code}")
            print(f"Response: {response.text}")
            
        print("-" * 60)
        return response.status_code == 200
        
    except requests.exceptions.ConnectionError:
        print("❌ Connection Error: Flask backend is not running or not accessible")
        print("-" * 60)
        return False
    except requests.exceptions.Timeout:
        print("❌ Timeout Error: Request took too long to complete")
        print("-" * 60)
        return False
    except Exception as e:
        print(f"❌ Unexpected Error: {e}")
        print("-" * 60)
        return False

def run_all_tests():
    """
    Run all API endpoint tests and provide a summary
    
    Returns:
        dict: Summary of test results
    """
    print("🚀 Starting Flask API Endpoint Tests")
    print("=" * 60)
    print(f"📍 Testing against: {BASE_URL}")
    print(f"⏱️  Timeout: {TIMEOUT} seconds")
    print("=" * 60)
    
    # Run all tests
    results = {
        'menu': test_get_menu(),
        'population_data': test_us_population_data(),
        'about': test_about()
    }
    
    # Print summary
    print("📋 Test Summary")
    print("=" * 60)
    passed = sum(results.values())
    total = len(results)
    
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"{status} {test_name.replace('_', ' ').title()}")
    
    print("=" * 60)
    print(f"🎯 Overall Result: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All tests passed! Backend is working correctly.")
    else:
        print("⚠️  Some tests failed. Check the Flask backend.")
    
    return results

if __name__ == "__main__":
    try:
        results = run_all_tests()
        # Exit with appropriate code
        sys.exit(0 if all(results.values()) else 1)
    except KeyboardInterrupt:
        print("\n⏹️  Testing interrupted by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n💥 Unexpected error during testing: {e}")
        sys.exit(1) 