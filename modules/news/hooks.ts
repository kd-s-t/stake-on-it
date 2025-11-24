'use client'

import { useState, useEffect, useCallback } from 'react'
import { NewsItem } from './types'
import { CACHE_KEY, CACHE_TTL } from './const'

async function getTrendingNews() {
  const res = await fetch('/api/news')
  const data = await res.json()
  return data
}

export function useNews() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [lastRefreshed, setLastRefreshed] = useState<Date | null>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fetchNews = useCallback(async (forceRefresh = false) => {
    if (forceRefresh) {
      localStorage.removeItem(CACHE_KEY)
    }
    
    if (!forceRefresh) {
      const cachedData = localStorage.getItem(CACHE_KEY)
      if (cachedData) {
        try {
          const { data, timestamp } = JSON.parse(cachedData)
          const cacheAge = Date.now() - timestamp
          
          if (cacheAge < CACHE_TTL) {
            setNews(data)
            setLastRefreshed(new Date(timestamp))
            setLoading(false)
            setRefreshing(false)
            return
          }
        } catch (e) {
        }
      }
    }
    
    setLoading(true)
    setError(null)
    try {
      const data = await getTrendingNews()
      
      if (data.success && data.news && Array.isArray(data.news) && data.news.length > 0) {
        setNews(data.news)
        setLastRefreshed(new Date())
        localStorage.setItem(CACHE_KEY, JSON.stringify({
          data: data.news,
          timestamp: Date.now()
        }))
      } else {
        setError('No news available')
        setNews([])
      }
    } catch (err: any) {
      console.error('Error fetching news:', err)
      setError('Error loading news: ' + err.message)
      setNews([])
    } finally {
      setLoading(false)
      setRefreshing(false)
    }
  }, [])

  useEffect(() => {
    if (!mounted) return
    fetchNews()
  }, [mounted, fetchNews])

  const isRefreshCooldown = useCallback(() => {
    if (!lastRefreshed) return false
    const timeSinceLastRefresh = Date.now() - lastRefreshed.getTime()
    const oneHour = 60 * 60 * 1000
    return timeSinceLastRefresh < oneHour
  }, [lastRefreshed])

  const getCooldownRemaining = useCallback(() => {
    if (!lastRefreshed) return null
    const timeSinceLastRefresh = Date.now() - lastRefreshed.getTime()
    const oneHour = 60 * 60 * 1000
    const remaining = oneHour - timeSinceLastRefresh
    if (remaining <= 0) return null
    const minutes = Math.ceil(remaining / (60 * 1000))
    return minutes
  }, [lastRefreshed])

  const handleRefresh = useCallback(async () => {
    if (isRefreshCooldown()) {
      return
    }
    setRefreshing(true)
    await fetchNews(true)
  }, [fetchNews, isRefreshCooldown])

  return {
    news,
    loading,
    error,
    lastRefreshed,
    refreshing,
    mounted,
    handleRefresh,
    fetchNews,
    isRefreshCooldown,
    getCooldownRemaining
  }
}

